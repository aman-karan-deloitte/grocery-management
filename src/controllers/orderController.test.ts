import request from 'supertest';
import app from '..';
import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();
describe('Order Controller', () => {
  beforeEach(async () => {
    await prismaClient.order.deleteMany();
  });

  describe('addOrder', () => {
    it('should create a new order', async () => {
      const response = await request(app)
        .post('/orders')
        .send({
          status: 'Active',
          userId: 1,
          productId: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 2,
          totalPrice: 100,
          paymentMethod: 'Credit Card',
          paymentStatus: 'Pending',
          deliveryAddress: '123 Main St',
          deliveryStatus: 'Pending',
          shipper: 'UPS',
          shipperId: 1,
          deliveryDate: new Date().toISOString(),
          lat: 37.7749,
          long: -122.4194,
        })
        .expect(201);

      expect(response.body).toHaveProperty('status', 201);
      expect(response.body).toHaveProperty('data');
    });

    it('should return an error for invalid request payload', async () => {
      const response = await request(app)
        .post('/orders')
        .send({
          status: 'Invalid',
          userId: 'invalid',
          productId: 'invalid',
          quantity: -1,
          totalPrice: -100,
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Invalid request');
      expect(response.body).toHaveProperty('issues');
    });
  });

  describe('updateOrder', () => {
    it('should update an existing order', async () => {
      const order = await prismaClient.order.create({
        data: {
          status: 'Active',
          userId: 1,
          productId: '123e4567-e89b-12d3-a456-426614174000',
          productName: 'Sample Product',
          quantity: 2,
          totalPrice: 100,
          paymentMethod: 'CreditCard',
          paymentStatus: 'Pending',
          deliveryAddress: '123 Main St',
          deliveryStatus: 'Pending',
          trackingNumber: 'abc123',
        },
      });

      const response = await request(app)
        .patch(`/orders/${order.id}`)
        .send({
          status: 'Inactive',
          userId: 1,
          productId: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 2,
          totalPrice: 100,
          paymentMethod: 'Credit Card',
          paymentStatus: 'Pending',
          deliveryAddress: '123 Main St',
          deliveryStatus: 'Pending',
        })
        .expect(200);

      expect(response.body).toHaveProperty('status', 200);
      expect(response.body).toHaveProperty('data');
    });

    it('should return an error for non-existent order', async () => {
      const response = await request(app)
        .patch('/orders/99999')
        .send({
          status: 'Inactive',
          userId: 1,
          productId: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 2,
          totalPrice: 100,
          paymentMethod: 'Credit Card',
          paymentStatus: 'Pending',
          deliveryAddress: '123 Main St',
          deliveryStatus: 'Pending',
        })
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Order not found');
    });
  });

  describe('getOrderStats', () => {
    it('should return order stats for a given time period', async () => {
      const response = await request(app)
        .get('/orders/stats')
        .query({
          type: 'Weekly',
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
        })
        .expect(200);

      expect(response.body).toHaveProperty('status', 200);
      expect(response.body).toHaveProperty('data');
    });

    it('should return an error for invalid time period', async () => {
      const response = await request(app)
        .get('/orders/stats')
        .query({
          type: 'Invalid',
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Invalid type');
    });
  });
});