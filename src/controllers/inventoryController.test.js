import request from 'supertest';
import {app} from '..';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient()
describe('Inventory Controller', () => {
  beforeEach(async () => {
    await prismaClient.inventory.deleteMany();
  });

  describe('addInventory', () => {
    it('should add a new inventory item', async () => {
      const response = await request(app)
        .post('/inventory')
        .set("Authorization", "Bearer token")
        .send({
          productName: 'Test Product',
          productType: 'Test Type',
          supplierId: 1,
          quantity: 10,
          price: 100,
          sellingPrice: 150,
          dateAdded: new Date(),
        })
        .expect(201);

      expect(response.body).toHaveProperty('status', 201);
      expect(response.body).toHaveProperty('message', 'Stock created successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('productId');
    });

    it('should return an error for invalid request payload', async () => {
      const response = await request(app)
        .post('/inventory')
        .set("Authorization", "Bearer token")
        .send({
          productName: '',
          productType: '',
          supplierId: '',
          quantity: '',
          price: '',
          sellingPrice: '',
          dateAdded: '',
        })
        .expect(400);

      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('message', 'Invalid request payload');
    });
  });

  describe('getNewStock', () => {
    it('should return the new stock', async () => {
      await request(app)
        .post('/inventory')
        .set("Authorization", "Bearer token")
        .send({
          productName: 'Test Product',
          productType: 'Test Type',
          supplierId: 1,
          quantity: 10,
          price: 100,
          sellingPrice: 150,
          dateAdded: new Date(),
        });

      const response = await request(app)
        .get('/inventory/new-stock')
        .set("Authorization", "Bearer token")
        .expect(200);

      expect(response.body).toHaveProperty('status', 200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('newStock');
    });
  });

  describe('getSummary', () => {
    it('should return the summary', async () => {
      await request(app)
        .post('/inventory')
        .set("Authorization", "Bearer token")
        .send({
          productName: 'Test Product',
          productType: 'Test Type',
          supplierId: 1,
          quantity: 10,
          price: 100,
          sellingPrice: 150,
          dateAdded: new Date(),
        });

      const response = await request(app)
        .get('/inventory/summary')
        .set("Authorization", "Bearer token")
        .expect(200);

      expect(response.body).toHaveProperty('status', 200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('totalStock');
      expect(response.body.data).toHaveProperty('lowStock');
      expect(response.body.data).toHaveProperty('outOfStock');
      expect(response.body.data).toHaveProperty('highDemandOrders');
    });
  });

  describe('getStockDetails', () => {
    it('should return the stock details', async () => {
      await request(app)
        .post('/inventory')
        .set("Authorization", "Bearer token")
        .send({
          productName: 'Test Product',
          productType: 'Test Type',
          supplierId: 1,
          quantity: 10,
          price: 100,
          sellingPrice: 150,
          dateAdded: new Date(),
        });

      const response = await request(app)
        .get('/inventory/stock-details')
        .set("Authorization", "Bearer token")
        .query({ pageNumber: 1, offset: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('status', 200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('stock');
    });
  });
});