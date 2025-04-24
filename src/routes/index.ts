import { Router } from "express";
import authRouter from "./auth";
import orderRouter from "./order";

const rootRouter: Router = Router();

rootRouter.use("/auth",authRouter);
rootRouter.use("/order", orderRouter);

export default rootRouter;