import request from 'supertest';
import app from '..';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient()

describe('Blog API', () => {
  beforeEach(async () => {
    await prismaClient.blog.deleteMany();
  });

  describe('addBlog', () => {
    it('should add a new blog', async () => {
      const response = await request(app)
        .post('/blogs')
        .set("Authorization", "Bearer token")
        .send({
          image: 'https://example.com/image.jpg',
          title: 'Test Blog',
          description: 'This is a test blog',
        })
        .expect(201);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('image', 'https://example.com/image.jpg');
      expect(response.body.data).toHaveProperty('title', 'Test Blog');
      expect(response.body.data).toHaveProperty('description', 'This is a test blog');
    });

    it('should return an error for invalid request', async () => {
      const response = await request(app)
        .post('/blogs')
        .set("Authorization", "Bearer token")
        .send({
          image: '',
          title: '',
          description: '',
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Invalid request');
    });
  });

  describe('getBlogs', () => {
    it('should get all blogs', async () => {
      await request(app)
        .post('/blogs')
        .set("Authorization", "Bearer token")
        .send({
          image: 'https://example.com/image.jpg',
          title: 'Test Blog',
          description: 'This is a test blog',
        });

      const response = await request(app)
        .get('/blogs')
        .set("Authorization", "Bearer token")
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('getAllBlogs', () => {
    it('should get all blogs with pagination', async () => {
      for (let i = 0; i < 10; i++) {
        await request(app)
          .post('/blogs')
          .set("Authorization", "Bearer token")
          .send({
            image: 'https://example.com/image.jpg',
            title: `Test Blog ${i}`,
            description: 'This is a test blog',
          });
      }

      const response = await request(app)
        .get('/blogs/all?page=1&limit=5')
        .set("Authorization", "Bearer token")
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data).toHaveLength(5);
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination).toHaveProperty('The currentPage');
      expect(response.body.pagination).toHaveProperty('totalPages');
      expect(response.body.pagination).toHaveProperty('totalBlogs');
    });

    it('should get all blogs with pagination and limit', async () => {
      for (let i = 0; i < 10; i++) {
        await request(app)
          .post('/blogs')
          .set("Authorization", "Bearer token")
          .send({
            image: 'https://example.com/image.jpg',
            title: `Test Blog ${i}`,
            description: 'This is a test blog',
          });
      }

      const response = await request(app)
        .get('/blogs/all?page=2&limit=5')
        .set("Authorization", "Bearer token")
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data).toHaveLength(5);
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination).toHaveProperty('The currentPage', 2);
      expect(response.body.pagination).toHaveProperty('totalPages');
      expect(response.body.pagination).toHaveProperty('totalBlogs');
    });
  });

  describe('getBlogById', () => {
    it('should get a blog by id', async () => {
      const blogResponse = await request(app)
        .post('/blogs')
        .set("Authorization", "Bearer token")
        .send({
          image: 'https://example.com/image.jpg',
          title: 'Test Blog',
          description: 'This is a test blog',
        });

      const blogId = blogResponse.body.data.id;

      const response = await request(app)
        .get(`/blogs/${blogId}`)
        .set("Authorization", "Bearer token")
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('Blog');
      expect(response.body.data.Blog).toHaveProperty('id', blogId);
      expect(response.body.data.Blog).toHaveProperty('image', 'https://example.com/image.jpg');
      expect(response.body.data.Blog).toHaveProperty('title', 'Test Blog');
      expect(response.body.data.Blog).toHaveProperty('description', 'This is a test blog');
    });

    it('should return an error for invalid blog id', async () => {
      const response = await request(app)
        .get('/blogs/invalid-id')
        .set("Authorization", "Bearer token")
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Invalid blog ID');
    });

    it('should return an error for non-existent blog id', async () => {
      const response = await request(app)
        .get('/blogs/99999')
        .set("Authorization", "Bearer token")
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Blog not found');
    });
  });
});