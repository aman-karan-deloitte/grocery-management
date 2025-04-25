import { z } from 'zod';

export const inventorySchema = z.object({
  productName: z.string({
    required_error: 'Product name is required',
    invalid_type_error: 'Product name must be a string',
  }),
  productType: z.string({
    required_error: 'Product type is required',
    invalid_type_error: 'Product type must be a string',
  }),
  supplierId: z.string({
    required_error: 'Supplier ID is required',
    invalid_type_error: 'Supplier ID must be a string',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }).int('Quantity must be an integer').min(0, 'Quantity cannot be negative'),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }).min(0, 'Price cannot be negative'),
  sellingPrice: z.number({
    required_error: 'Selling price is required',
    invalid_type_error: 'Selling price must be a number',
  }).min(0, 'Selling price cannot be negative'),
  dateAdded: z.date({
    required_error: 'Date added is required',
    invalid_type_error: 'Date added must be a date',
  }),
});