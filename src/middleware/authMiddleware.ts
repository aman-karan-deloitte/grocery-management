// authMiddleware.ts
import { NextFunction, Request, Response } from "express";
import { UnauthorisedException } from "../exceptions/unauthorised";
import { ErrorCode } from "../exceptions/root";
import * as jwt from 'jsonwebtoken';
import { prismaClient } from "..";
import { JWT_SECRET } from "../secret";
import { user } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: user;
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // extract token
  const token = req.headers.authorization || req.query.token || req.body.token;
  console.log("user");
  console.log(token);
  // if token is not available then throw error
  if (!token) {
    throw new UnauthorisedException("Token not found", ErrorCode.UNAUTHORIZED, null);
  }
  try {
    // if token is available then verify the token and extract userId from it
    const blacklistedToken = await prismaClient.blacklistedToken.findFirst({ where: { token } });
    if (blacklistedToken) {
      throw new UnauthorisedException('Token is blacklisted', ErrorCode.UNAUTHORIZED, null);
    }
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
      throw new UnauthorisedException("User not found", ErrorCode.UNAUTHORIZED, null);
    }
    console.log(user);
    req.user = user;
    next();

  } catch (error: any) {
    throw new UnauthorisedException("Invalid token", ErrorCode.UNAUTHORIZED, null);
  }
}

export default authMiddleware;