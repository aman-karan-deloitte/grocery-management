import { PrismaClient, shipmentStatus } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";


const prisma = new PrismaClient();
// API function

// export const createShipment = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { total, completed, pending, inTransit, cancelled } = req.body;
  
//       const shipment = await prisma.shipment.create({
//         data: {
//           total,
//           completed,
//           pending,
//           inTransit,
//           cancelled
//         },
//       });
  
//       res.status(201).json({
//         status: 201,
//         data: shipment,
//       });
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         res.status(400).json({ message: 'Invalid request', issues: error.issues });
//       } else {
//         console.error('Error creating shipment:', error);
//         res.status(500).json({ message: 'Server Error' });
//       }
//     }
//   };


export const getShipmentStats = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    try {
      const total = await prisma.order.count();
      const inTransit = await prisma.order.count({
        where: { shipmentStatus: 'InTransit' },
      });
      const completed = await prisma.order.count({
        where: { shipmentStatus: 'Completed' },
      });
      const pending = await prisma.order.count({
        where: { shipmentStatus: 'Pending' },
      });
      const failed = await prisma.order.count({
        where: { shipmentStatus:"Failed" },
      });
  
      res.status(200).json({
        status: 200,
        data: {
          Total: total,
          Completed: completed,
          "In-Transit": inTransit,
          Pending: pending,
          Failed: failed,
        },
      });
    } catch (error) {
      console.error('Error getting shipment stats:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


export const getShipmentDetails = async (req: Request, res: Response) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const offset = parseInt(req.query.offset as string) || 10;
    const status = req.query.status as string;

    const shipments = await prisma.shipment.findMany({
      where: {
        shipmentStatus: status ? { equals: status as shipmentStatus } : undefined,
      },
      include: {
        order: {
          include: {
            shipment: true,
          },
        },
      },
      skip: (pageNumber - 1) * offset,
      take: offset,
    });

    const shipmentDetails = shipments.map((shipment) => ({
      shipmentId: shipment.id,
      productId: shipment.order.productId,
      productName: shipment.order.productName,
      supplierId: shipment.shipperId,
      supplierName: shipment.shipper,
      quantity: shipment.order.quantity,
      price: shipment.order.totalPrice,
      deliveryDate: shipment.deliveryDate,
      shipperId: shipment.shipper,
      shipperName: shipment.shipper,
      shipmentDestination: 'Delhi', // Assuming this is hardcoded for now
      shipmentStatus: shipment.shipmentStatus,
      lat: shipment.lat,
      long: shipment.long,
    }));

    res.status(200).json({
      status: 200,
      data: {
        shipment: shipmentDetails,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};