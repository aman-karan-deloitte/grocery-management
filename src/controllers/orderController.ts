import { NextFunction, Request, RequestHandler, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { parseISO } from 'date-fns';
import { OrderStatus } from '@prisma/client';
import { z } from 'zod';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();
const orderSchema = z.object({
  status: z.enum([OrderStatus.Active, OrderStatus.Inactive]),
});

// Add Order
export const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    orderSchema.parse(req.body);
    const trackingNumber= nanoid(10);
    const {
      status ,
      userId,
      productId ,
      productName,
      quantity  ,
      totalPrice ,
      paymentMethod ,
      paymentStatus,
      shipmentStatus,
      deliveryAddress ,
      deliveryStatus,
      shipper,
      shipperId,
      deliveryDate,
      lat,
      long,
    } = req.body;
    const order = await prisma.order.create({
      data: {
            status,
            userId:userId,
            productId,
            productName,
            quantity,
            totalPrice,
            paymentMethod,
            paymentStatus,
            shipmentStatus,
            deliveryAddress,
            deliveryStatus,
            trackingNumber:trackingNumber,
      },
    });

    const shipment = await prisma.shipment.create({
      data: {
        orderId: order.id,
        shipper,
        shipperId,
        trackingNumber,
        shipmentStatus,
        deliveryDate,
        lat,
        long,
      },
    });

    res.status(201).json({
      status: 201,
      data: order,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Invalid request', issues: error.issues });
    } else {
      console.error('Error adding order:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

// Update Order
export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    orderSchema.parse(req.body);
    const {
      status,
      userId,
      productId,
      quantity,
      totalPrice,
      paymentMethod,
      paymentStatus,
      deliveryAddress,
      deliveryStatus,
    } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        userId,
        productId,
        quantity,
        totalPrice,
        paymentMethod,
        paymentStatus,
        deliveryAddress,
        deliveryStatus,
      },
    });

    res.status(200).json({
      status: 200,
      data: order,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        res.status(404).json({ message: 'Order not found' });
      } else {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Server Error' });
      }
    } else {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

export const getOrderStats: RequestHandler = async (req, res, next) => {
  try {
    const { type, startDate: startDateQuery, endDate: endDateQuery } = req.query;
    let startDate = new Date(startDateQuery as string);
    let endDate = new Date(endDateQuery as string);
    let today = new Date();
    console.log(today);
    let orderStats = [];
    switch (type) {
      case 'Weekly':
        orderStats = await getWeeklyStats(startDate, endDate);
        break;
      case 'Monthly':
        orderStats = await getMonthlyStats(startDate, endDate);
        break;
      case 'Quarterly':
        orderStats = await getQuarterlyStats(startDate, endDate);
        break;
      case 'HalfYearly':
        orderStats = await getHalfYearlyStats(startDate, endDate);
        break;
      case 'Yearly':
        orderStats = await getYearlyStats(startDate, endDate);
        break;
      default:
        res.status(400).json({ message: 'Invalid type' });
        return;
    }
    res.status(200).json({
      status: 200,
      data: orderStats,
    });
  } catch (error) {
    console.error('Error getting order stats:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}


const getWeeklyStats = async (startDate: Date, endDate: Date) => {
  let currentDate = new Date(startDate);
  let weeklyStats = [];

  while (currentDate <= endDate) {
    let weekEndDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (weekEndDate > endDate) {
      weekEndDate = endDate;
    }

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: currentDate,
          lte: weekEndDate,
        },
      },
    });

    const activeOrders = orders.filter((order) => order.status === 'Active').length;
    const inactiveOrders = orders.filter((order) => order.status === 'Inactive').length;

    weeklyStats.push({
      week: `${currentDate.toISOString().split('T')[0]} - ${weekEndDate.toISOString().split('T')[0]}`,
      Active: activeOrders,
      Inactive: inactiveOrders,
    });

    currentDate = new Date(weekEndDate.getTime() + 24 * 60 * 60 * 1000);
  }

  return weeklyStats;
};
const getMonthlyStats = async (startDate: Date, endDate: Date) => {
  let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  let monthlyStats = [];

  while (currentDate <= endDate) {
    let monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    if (monthEndDate > endDate) {
      monthEndDate = endDate;
    }

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: currentDate,
          lte: monthEndDate,
        },
      },
    });

    const activeOrders = orders.filter((order) => order.status === 'Active').length;
    const inactiveOrders = orders.filter((order) => order.status === 'Inactive').length;

    monthlyStats.push({
      month: `${currentDate.toISOString().split('T')[0]} - ${monthEndDate.toISOString().split('T')[0]}`,
      Active: activeOrders,
      Inactive: inactiveOrders,
    });

    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  return monthlyStats;
};

const getQuarterlyStats = async (startDate: Date, endDate: Date) => {
  let currentDate = new Date(startDate.getFullYear(), Math.floor(startDate.getMonth() / 3) * 3, 1);
  let quarterlyStats = [];

  while (currentDate <= endDate) {
    let quarterEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 0);

    if (quarterEndDate > endDate) {
      quarterEndDate = endDate;
    }

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: currentDate,
          lte: quarterEndDate,
        },
      },
    });

    const activeOrders = orders.filter((order) => order.status === 'Active').length;
    const inactiveOrders = orders.filter((order) => order.status === 'Inactive').length;

    quarterlyStats.push({
      quarter: `${currentDate.toISOString().split('T')[0]} - ${quarterEndDate.toISOString().split('T')[0]}`,
      Active: activeOrders,
      Inactive: inactiveOrders,
    });

    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 1);
  }

  return quarterlyStats;
};

const getHalfYearlyStats = async (startDate: Date, endDate: Date) => {
  let currentDate = new Date(startDate.getFullYear(), startDate.getMonth() < 6 ? 0 : 6, 1);
  let halfYearlyStats = [];

  while (currentDate <= endDate) {
    let halfYearEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, 0);

    if (halfYearEndDate > endDate) {
      halfYearEndDate = endDate;
    }

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: currentDate,
          lte: halfYearEndDate,
        },
      },
    });

    const activeOrders = orders.filter((order) => order.status === 'Active').length;
    const inactiveOrders = orders.filter((order) => order.status === 'Inactive').length;

    halfYearlyStats.push({
      halfYear: `${currentDate.toISOString().split('T')[0]} - ${halfYearEndDate.toISOString().split('T')[0]}`,
      Active: activeOrders,
      Inactive: inactiveOrders,
    });

    currentDate = new Date(currentDate.getFullYear() + (currentDate.getMonth() < 6 ? 0 : 1), currentDate.getMonth() < 6 ? 6 : 0, 1);
  }

  return halfYearlyStats;
};

const getYearlyStats = async (startDate: Date, endDate: Date) => {
  let currentDate = new Date(startDate.getFullYear(), 0, 1);
  let yearlyStats = [];

  while (currentDate <= endDate) {
    let yearEndDate = new Date(currentDate.getFullYear(), 11, 31);

    if (yearEndDate > endDate) {
      yearEndDate = endDate;
    }

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: currentDate,
          lte: yearEndDate,
        },
      },
    });

    const activeOrders = orders.filter((order) => order.status === 'Active').length;
    const inactiveOrders = orders.filter((order) => order.status === 'Inactive').length;

    yearlyStats.push({
      year: `${currentDate.getFullYear()}`,
      Active: activeOrders,
      Inactive: inactiveOrders,
    });

    currentDate = new Date(currentDate.getFullYear() + 1, 0, 1);
  }

  return yearlyStats;
};