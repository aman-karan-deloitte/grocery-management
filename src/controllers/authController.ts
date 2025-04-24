import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync,compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secret";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { loginSchema, signupSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/notFound";
import { UnauthorisedException } from "../exceptions/unauthorised";
import { InternalException } from "../exceptions/internalExceptions";
import { boolean } from "zod";

export const signIn = async (req: Request, res: Response, next:NextFunction) => {
  
  
    try {
      if (!req.body || !req.body.email || !req.body.password) {
        throw new BadRequestException("Request body is empty or missing required fields", ErrorCode.BAD_REQUEST, null);
      }
  
      const { email, password } = req.body;
      loginSchema.parse({ email, password });
      let user = await prismaClient.user.findFirst({ where: { email } });
   
      if (!user) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND, null);
      } else if (!user.password || !compareSync(password, user.password)) {
        throw new BadRequestException("Incorrect password", ErrorCode.INVALID_CREDENTIALS, null);
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET,{ expiresIn: '24h' });
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }

export const signUp = async (req: Request, res: Response,next:NextFunction):Promise<void> => {

  console.log(req.body);
    try {
      console.log("try");
      signupSchema.parse(req.body);
      const {username,firstName,middleName,lastName,email,password,phone} = req.body;
      console.log(req.body);
      let user = await prismaClient.user.findFirst({ where: { email } });
      if (user) {
        console.log("if")
        new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS, null);
      } else {
        console.log("else")
        user = await prismaClient.user.create({
          data: {
            username,
            firstName,
            middleName,
            lastName,
            email,
            password: hashSync(password, 10),
            phone
          }
        });
        res.json(user);
      }
    } catch (error:any) {
      console.log("dshdh");
      throw new UnprocessableEntity('unprocessable entity',error?.issues,ErrorCode.UNPROCESSABLE_ENTITY);
    }
  }

  export const profile = async (req: Request, res: Response) => {
       const authHeader = req.headers.authorization;
       
       console.log(req.user);
       res.status(200).json(req.user);
  }


  export const signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("signout1")
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        console.log("signout2")
        throw new UnauthorisedException('Unauthorized', ErrorCode.UNAUTHORIZED, null);
      }
     console.log("signout3")
      await prismaClient.blacklistedToken.create({
        data: {
          token,
        },
      });
      console.log("signout4")
      res.json({ message: 'Signed out successfully' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  // {
  //   "username": "test01",
  //   "firstName": "unknown",
  //   "middleName": "",
  //   "lastName": "user",
  //   "email": "user@gmail.cpm",
  //   "password": "user123",
  //   "phone": "+911234567890"
  // }
  
