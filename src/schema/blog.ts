import {z} from 'zod'


export const blogSchema = z.object({
    title: z.string().min(3),
    image: z.string().url().optional(),
    description: z.string().min(10).optional(),
    date: z.string().date().optional()
})
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NTUwMjU3NywiZXhwIjoxNzQ1NTg4OTc3fQ.0mFvLhKRAHGsoldcZ7yPwqVNbNc2XaQilCR74jE1IPA"