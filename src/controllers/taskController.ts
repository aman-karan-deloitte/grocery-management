import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { taskSchema } from '../schema/task';
import { z } from 'zod';

const prisma = new PrismaClient();
export const createTask = async (req: Request, res: Response) => {
  try {
    taskSchema.parse(req.body); 
    const {
      taskType,
      assignee,
      priorityLevel,
      description,
      dueDate,
      location,
    } = req.body;

    const task = await prisma.task.create({
      data: {
        taskType,
        assignee,
        priorityLevel,
        description,
        dueDate: new Date(dueDate),
        location,
      },
    });

    res.status(201).json({
      status: 201,
      message: 'Task created successfully',
      data: {
        taskId: task.id,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Invalid request', issues: error.issues });
    } else {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

export const getTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.taskId;
  
      if (!taskId) {
        res.status(400).json({ message: 'Task ID is required' });
        return;
      }
  
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });
  
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
  
      res.status(200).json({
        status: 200,
        message: 'Task retrieved successfully',
        data: task,
      });
    } catch (error) {
      console.error('Error retrieving task:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  export const getAllTasks = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    try {
      const tasks = await prisma.task.findMany();
  
      res.status(200).json({
        status: 200,
        message: 'Tasks retrieved successfully',
        data: tasks,
      });
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };