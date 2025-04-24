import {z} from 'zod'

export const shipmentSchema = z.object({
    shipmentId: z.string().uuid(),
    status: z.enum(['Pending', 'Completed', 'Intransit', 'Cancelled']),
})