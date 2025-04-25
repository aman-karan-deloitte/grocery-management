import { z } from 'zod';

export const taskSchema = z.object({
  taskType: z.string({
    required_error: 'Task type is required',
    invalid_type_error: 'Task type must be a string',
  }),
  assignee: z.string({
    required_error: 'Assignee is required',
    invalid_type_error: 'Assignee must be a string',
  }),
  priorityLevel: z.enum(['Critical', 'High', 'Medium', 'Low'], {
    required_error: 'Priority level is required',
    invalid_type_error: 'Invalid priority level',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),
  dueDate: z.string().datetime({
    message: 'Due date must be a valid date string',
  }),
  location: z.string({
    required_error: 'Location is required',
    invalid_type_error: 'Location must be a string',
  }),
  status: z.enum(['Open', 'In Progress', 'Completed'], {
    invalid_type_error: 'Invalid status',
  }).optional().default('Open'),
});