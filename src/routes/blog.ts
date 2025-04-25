import {Router} from 'express';
import { addBlog, getAllBlogs, getBlogById, getBlogs } from '../controllers/blogController';
import authMiddleware from '../middleware/authMiddleware';
const blogRouter:Router=Router();

blogRouter.get("/blogs",authMiddleware,getBlogs);
blogRouter.post("/create", authMiddleware, addBlog);
blogRouter.get("/all",authMiddleware, getAllBlogs);
blogRouter.get("/:id",authMiddleware, getBlogById);
export default blogRouter;