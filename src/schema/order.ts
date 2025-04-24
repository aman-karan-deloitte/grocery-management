import {z} from 'zod'

export const orderSchema = z.object({
    status: z.enum(['Active', 'Inactive']),
    orderId: z.string().uuid(),
    userId: z.string().uuid(),
    productId: z.string().uuid(),
    quantity: z.number().min(1),
    totalPrice: z.number().min(0),
    orderDate: z.date().optional(),
    deliveryDate: z.date().optional(),
    deliveryAddress: z.string().optional(),
    paymentMethod: z.enum(['Credit Card', 'PayPal', 'Bank Transfer']).optional(),
    paymentStatus: z.enum(['Pending', 'Completed', 'Failed']).optional(),
    trackingNumber: z.string().optional(),
    trackingUrl: z.string().url().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
})
