import { z } from 'zod'

export const orderSchema = z.object({
  status: z.enum(['Active', 'Inactive']),
  userId: z.number(),
  productId: z.string().uuid(),
  quantity: z.number().min(1),
  totalPrice: z.number().min(0),
  orderDate: z.date().optional(),
  deliveryDate: z.string().optional(),
  deliveryAddress: z.string().optional(),
  shipmentStatus: z.enum(['Pending', 'Completed', 'InTransit', 'Failed']),
  paymentMethod: z.enum(['Credit Card','Debit Card', 'PayPal', 'Bank Transfer']).optional(),
  paymentStatus: z.enum(['Pending', 'Completed', 'Failed']).optional(),
  trackingNumber: z.string().optional(),
  trackingUrl: z.string().url().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})
