import {Router} from 'express';
import { getShipmentDetails, getShipmentStats } from '../controllers/shipment';
import authMiddleware from '../middleware/authMiddleware';

const shipmentRouter:Router=Router();

shipmentRouter.get("/",authMiddleware, getShipmentStats);
shipmentRouter.get("/details",authMiddleware, getShipmentDetails);

export default shipmentRouter;