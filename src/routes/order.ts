import {Router} from 'express';
import { addOrder, getOrderStats, updateOrder } from '../controllers/orderController';

const orderRouter:Router=Router();

orderRouter.post("/add", addOrder);
// orderRouter.put("/update/:id", updateOrder);
orderRouter.get("/stats", getOrderStats);


export default  orderRouter;