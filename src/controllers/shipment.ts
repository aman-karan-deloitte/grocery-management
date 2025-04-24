import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";


const prisma = new PrismaClient();
// API function
export const getShipmentStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipments = await prisma.shipment.findMany();
  
      const total = shipments.length;
      const completed = shipments.filter((shipment) => shipment.status === 'Completed').length;
      const inTransit = shipments.filter((shipment) => shipment.status === 'InTransit').length;
      const pending = shipments.filter((shipment) => shipment.status === 'Pending').length;
      const failed = shipments.filter((shipment) => shipment.status === 'Failed').length;
  
      res.status(200).json({
        status: 200,
        data: {
          Total: total,
          Completed: completed,
          'In-Transit': inTransit,
          Pending: pending,
          Failed: failed,
        },
      });
    } catch (error) {
      console.error('Error getting shipment stats:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };