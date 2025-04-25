import {Router}  from 'express';
import { createTask, getAllTasks, getTask } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';

const taskrouter:Router = Router();

taskrouter.post('/',createTask);
taskrouter.get('/:taskId',getTask);
taskrouter.get('all',authMiddleware,getAllTasks);



export default taskrouter;