import {Router} from 'express';
import { addInventory } from '../controllers/inventoryController';

const inventoryRouter:Router=Router();

inventoryRouter.post("/add", addInventory)

export default inventoryRouter;