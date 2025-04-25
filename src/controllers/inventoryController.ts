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

    // stock.controller.ts
    export const getStockDetails = async (req: Request, res: Response) => {
        const authHeader = req.headers.authorization;
        try {
          const pageNumber = parseInt(req.query.pageNumber as string) || 1;
          const offset = parseInt(req.query.offset as string) || 10;
          const status = req.query.status as string;
      
          const skip = (pageNumber - 1) * offset;
      
          let whereClause = {};
      
          if (status === 'available') {
            whereClause = { quantity: { gt: 0 } };
          } else if (status === 'out_of_stock') {
            whereClause = { quantity: { eq: 0 } };
          }
      
          const stockDetails = await prisma.inventory.findMany({
            where: whereClause,
            skip,
            take: offset,
            select: {
              id: true,
              productName: true,
              quantity: true,
              price: true,
              sellingPrice: true,
              dateAdded: true,
            },
          });
      
          const stock = stockDetails.map((item) => {
            return {
              productId: item.id,
              productName: item.productName,
              dateOfEntry: item.dateAdded.toISOString().split('T')[0],
              quantity: item.quantity,
              price: item.price,
              sellingPrice: item.sellingPrice,
              status: item.quantity > 0 ? 'Available' : 'Out of Stock',
            };
          });
      
          res.json({
            status: 200,
            data: {
              stock,
            },
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };