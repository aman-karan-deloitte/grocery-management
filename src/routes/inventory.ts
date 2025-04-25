import {Router} from 'express';
import { addInventory, getNewStock, getSummary } from '../controllers/inventoryController';
import authMiddleware from '../middleware/authMiddleware';

const inventoryRouter:Router=Router();

inventoryRouter.post("/add", addInventory);
inventoryRouter.get("/newStock",authMiddleware, getNewStock);
inventoryRouter.get("/summary",authMiddleware, getSummary);

export default inventoryRouter;