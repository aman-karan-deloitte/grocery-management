import {z} from 'zod'

export const updateShipmentSchema = z.object({
  shipper: z.string().optional(),
  trackingNumber: z.string().optional(),
  shipmentStatus: z.enum(['Pending', 'InTransit', 'Delivered', 'Failed']).optional(),
  deliveryDate: z.date().optional(),
  lat: z.number().optional(),
  long: z.number().optional(),
})