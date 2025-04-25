import request from 'supertest';
import app from '..';
import { prismaClient } from '..';
import { beforeEach, describe, it } from 'node:test';
import { expect } from '@jest/globals';

describe('AuthController', () => {
  beforeEach(async () => {
    await prismaClient.user.deleteMany();
  });
  describe('signUp', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/auth/signup')
        .send({
          username: 'test01',
          firstName: 'unknown',
          middleName: '',
          lastName: 'user',
          email: 'user@gmail.com',
          password: 'user1234',
          phone: '+911234567890',
        })
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username', 'test01');
      expect(response.body).toHaveProperty('email', 'user@gmail.com');
    });

    it('should return an error for invalid data', async () => {
      const response = await request(app)
        .post('/auth/signup')
        .send({
          username: 'test01',
          firstName: 'unknown',
          middleName: '',
          lastName: 'user',
          email: 'invalid-email',
          password: 'user123',
          phone: '+911234567890',
        })
        .expect(422);

      expect(response.body).toHaveProperty('error');
    });
  
    it('should return an error for duplicate email', async () => {
      await request(app)
        .post('/auth/signup')
        .send({
          username: 'test01',
          firstName: 'unknown',
          middleName: '',
          lastName: 'user',
          email: 'user@gmail.com',
          password: 'user123',
          phone: '+911234567890',
        });
  
      const response = await request(app)
        .post('/auth/signup')
        .send({
          username: 'test02',
          firstName: 'unknown',
          middleName: '',
          lastName: 'user',
          email: 'user@gmail.com',
          password: 'user123',
          phone: '+911234567890',
        })
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
    });
  
    it('should return an error for duplicate username', async () => {
      await request(app)
        .post('/auth/signup')
        .send({
          username: 'test01',
          firstName: 'unknown',
          middleName: '',
          lastName: 'user',
          email: 'user@gmail.com',
          password: 'user123',
          phone: '+911234567890',
        });
  
      const response = await request(app)
        .post('/auth/signup')
        .send({
          username: 'test01',
          firstName: 'app',
          email: 'user02@gmail.com',
          password: 'user123',
          phone: '+911234567890',
        })
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
    });
  
    it('should return an error for invalid phone number', async () => {
      const response = await request(app)
        .post('/auth/signup')
        .send({
          username: 'test01',
          firstName: 'unknown',
          middleName: '',
          lastName: 'user',
          email: 'user@gmail.com',
          password: 'user123',
          phone: 'invalid-phone',
        })
        .expect(422);
  
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('signIn', () => {
    it('should login an existing user', async () => {
      await request(app)
        .post('/auth/signup')
        .send({
          username: 'test01',
          firstName: 'unknown',
          middleName: '',
          lastName: 'user',
          email: 'user@gmail.com',
          password: 'user123',
          phone: '+911234567890',
        });

      const response = await request(app)
        .post('/auth/signin')
        .send({
          email: 'user@gmail.com',
          password: 'user123',
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('should return an error for invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/signin')
        .send({
          email: 'user@gmail.com',
          password: 'wrong-password',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
    it('should return an error for non-existent email', async () => {
      const response = await request(app)
        .post('/auth/signin')
        .send({
          email: 'non-existent-email@gmail.com',
          password: 'user123',
        })
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
    });
  
    it('should return an error for empty password', async () => {
      const response = await request(app)
        .post('/auth/signin')
        .send({
          email: 'user@gmail.com',
          password: '',
        })
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
    });
  
    it('should return an error for empty email', async () => {
      const response = await request(app)
        .post('/auth/signin')
        .send({
          email: '',
          password: 'user123',
        })
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('profile', () => {
    it('should return the user profile', async () => {
      const signUpResponse = await request(app)
        .post('/auth/signup')
        .send({
          username: 'test01',
          firstName: 'unknown',
          middleName: '',
          lastName: 'user',
          email: 'user@gmail.com',
          password: 'user123',
          phone: '+911234567890',
        });

      const signInResponse = await request(app)
        .post('/auth/signin')
        .send({
          email: 'user@gmail.com',
          password: 'user123',
        });

      const token = signInResponse.body.token;

      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username', 'test01');
      expect(response.body).toHaveProperty('email', 'user@gmail.com');
    });
  });

  describe('signOut', () => {
    it('should sign out the user', async () => {
      const signUpResponse = await request(app)
        .post('/auth/signup')
        .send({
          username: 'test01',
          firstName: 'unknown',
          middleName: '',
          lastName: 'user',
          email: 'user@gmail.com',
          password: 'user123',
          phone: '+911234567890',
        });

      const signInResponse = await request(app)
        .post('/auth/signin')
        .send({
          email: 'user@gmail.com',
          password: 'user123',
        });

      const token = signInResponse.body.token;

      const response = await request(app)
        .post('/auth/signout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Signed out successfully');
    });
  });
});

function customExpect(body: any) {
    throw new Error('Function not implemented.');
}

