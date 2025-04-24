import {z} from 'zod'

export const signupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(3),
    middleName: z.string().optional(),
    lastName: z.string().min(3),
    phone: z.string().regex(/^\+?[0-9]{7,15}$/).optional(),
})


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

