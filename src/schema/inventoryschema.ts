import { z } from 'zod';

export const inventorySchema = z.object({
    productName: z.string(),
    productType: z.string(),
    supplierId: z.string(),
    productStatus: z.enum(['Available', 'Out Of Stock']).default('Available'),
    quantity: z.number(),
    price: z.number(),
    sellingPrice: z.number()
  });