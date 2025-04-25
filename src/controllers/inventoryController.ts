import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { inventorySchema } from '../schema/inventory';



const prisma = new PrismaClient();
export const addInventory = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    try {
      // Validate the request payload
      //inventorySchema.parse(req.body)
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
          dateAdded: validatedData.dateAdded,
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
        console.log('Validation error:', error.issues);
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

  export const getNewStock = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    try {
      const newStock = await prisma.inventory.findMany({
        select: {
          id: true,
          productName: true,
          quantity: true,
          dateAdded: true,
        },
        orderBy: {
          dateAdded: 'desc',
        },
        take: 5,
      });
  
      const formattedNewStock = newStock.map((stock) => ({
        productId: stock.id,
        productName: stock.productName,
        quantity: stock.quantity,
        dateAdded: stock.dateAdded.toISOString().split('T')[0],
      }));
  
      res.status(200).json({
        status: 200,
        data: {
          newStock: formattedNewStock,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  };

  export const getSummary = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    try {
      const totalStock = await prisma.inventory.count();
      const lowStock = await prisma.inventory.count({
        where: {
          quantity: {
            lt: 10,
          },
        },
      });
      const outOfStock = await prisma.inventory.count({
        where: {
          quantity: 0,
        },
      });
      const highDemandOrders = await prisma.order.count({
        where: {
          status: 'Active',
        },
      });
  
      res.status(200).json({
        status: 200,
        data: {
          totalStock,
          lowStock,
          outOfStock,
          highDemandOrders,
        },
      });
    } catch (error) {
      console.error('Error retrieving summary data:', error);
      res.status(500).json({
        status: 500,
        message: 'Server Error',
      });
    }
  };

