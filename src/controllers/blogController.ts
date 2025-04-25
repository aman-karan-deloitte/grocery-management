// API function
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { blogSchema } from '../schema/blog';
import { querySchema } from '../schema/queryschema';

const prisma = new PrismaClient();

// API function
  
export const addBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    try {
      console.log("blog body");
      blogSchema.parse(req.body);
      console.log("blog body schema passed");
      const { image, title, description } = req.body;
      const blog = await prisma.blog.create({
        data: {
          image,
          title,
          description,
          date: new Date(), 
        },
      });
      console.log("blog body response created ");
      res.status(201).json({
        status: 201,
        message: 'Blog added successfully',
        data: {
          id: blog.id,
          image: blog.image,
          title: blog.title,
          description: blog.description,
          date: blog.date.toISOString(),
        },
      });
    } catch (error) {
      console.log("blog error");
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid request', issues: error.issues });
        return;
      }
      console.error('Error adding blog:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    try {
      const blogs = await prisma.blog.findMany();
  
      res.status(200).json({
        status: 200,
        data: blogs.map((blog) => ({
            id: blog.id,
            image: blog.image,
            title: blog.title,
            description: blog.description,
            date: blog.date.toISOString(),
          })),
      });
    } catch (error) {
      console.error('Error getting blogs:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  // {
  //   "image": "https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.jpg?s=612x612&w=0&k=20&c=7SScR_Y4n7U3k5kBviYm3VwEmW4vmbngDUa0we429GA=",
  //   "title": "Blog",
  //   "description": "This is my first blog",
  //   "date": "2025-04-24"
  // }


  
  export const getAllBlogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    try {
      querySchema.parse(req.query)
      const { page : pageQuery, limit:limitQuery } = req.query;
      let page = parseInt(pageQuery as string) || 1; 
      let limit = parseInt(limitQuery as string) || 10;
      const offset = (page - 1) * limit;
      const blogs = await prisma.blog.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          id: 'asc',
        },
      });
  
      const totalBlogs = await prisma.blog.count();
      const totalPages = Math.ceil(totalBlogs / limit);
  
      res.status(200).json({
        status: 200,
        message: 'Blogs fetched successfully',
        data: blogs,
        pagination: {
          currentPage: page,
          totalPages,
          totalBlogs,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid query parameters', issues: error.issues });
        return;
      }
  
      console.error('Error fetching blogs:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


  export const getBlogById = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    try {
      const blogId = parseInt(req.params.id);
  
      if (isNaN(blogId)) {
        res.status(400).json({
          status: 400,
          message: 'Invalid blog ID',
        });
        return;
      }
  
      const blog = await prisma.blog.findUnique({
        where: { id: blogId },
        select: {
          id: true,
          image: true,
          title: true,
          description: true,
          date: true,
        },
      });
  
      if (!blog) {
        res.status(404).json({
          status: 404,
          message: 'Blog not found',
        });
        return;
      }
  
      res.status(200).json({
        status: 200,
        data: {
          Blog: blog,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  };