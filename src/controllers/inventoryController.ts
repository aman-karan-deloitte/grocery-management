import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { inventorySchema } from '../schema/inventory';



const prisma = new PrismaClient();
export const addInventory = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    try {
      // Validate the request payload
      inventorySchema.parse(req.body)
      const validatedData = req.body;
      // Create a new inventory item
      const inventory = await prisma.inventory.create({
        data: {
          productName: validatedData.productName,
          productType: validatedData.productType,
          supplierId: validatedData.supplierId,
          quantity: validatedData.quantity,
          price: validatedData.price,
          sellingPrice: validatedData.sellingPrice,
          dateAdded: validatedData.dateAdded || new Date().toISOString(),
        },
      });
  
      // Return a successful response
      res.status(201).json({
        status: 201,
        message: 'Stock created successfully',
        data: {
          productId: inventory.id,
        },
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        res.status(400).json({
          status: 400,
          message: 'Invalid request payload',
          errors: error.issues,
        });
      } else {
        // Handle other errors
        res.status(500).json({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    }
  };