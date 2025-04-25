import { Router } from "express";
import authRouter from "./auth";
import orderRouter from "./order";
import shipmentRouter from "./shipments";
import blogRouter from "./blog";
import taskrouter from "./task";
import inventoryRouter from "./inventory";

const rootRouter: Router = Router();

rootRouter.use("/auth",authRouter);
rootRouter.use("/order", orderRouter);
rootRouter.use("/shipment", shipmentRouter);
rootRouter.use("/blog",blogRouter);
rootRouter.use("/task",taskrouter)
rootRouter.use("/inventory", inventoryRouter)

export default rootRouter;