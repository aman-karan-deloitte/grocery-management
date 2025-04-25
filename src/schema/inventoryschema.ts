import { z } from 'zod';

export const inventorySchema = z.object({
    productName: z.string(),
    productType: z.string(),
    supplierId: z.string(),
    quantity: z.number(),
    price: z.number(),
    sellingPrice: z.number()
  });