import {Router} from 'express';
import { addInventory, getNewStock, getStockDetails, getSummary } from '../controllers/inventoryController';
import authMiddleware from '../middleware/authMiddleware';

const inventoryRouter:Router=Router();

inventoryRouter.post("/add", addInventory);
inventoryRouter.get("/newStock",authMiddleware, getNewStock);
inventoryRouter.get("/summary",authMiddleware, getSummary);
inventoryRouter.get("/stockDetails",authMiddleware,getStockDetails);

export default inventoryRouter;