import {Router} from 'express';
import {signUp,signIn, profile,signOut} from '../controllers/authController'
import { errorHandler } from '../errorHandler';
import authMiddleware from '../middleware/authMiddleware';

const authRouter:Router=Router();


authRouter.post("/signup",signUp);
authRouter.post("/signin",signIn);
authRouter.get("/profile",authMiddleware,profile)
authRouter.post("/signout",signOut)
export default authRouter;