import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internalExceptions";

//it is like high order function
export const errorHandler = (method: Function) =>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
           await method(req,res,next);
        }catch(error:any){
            let exception: HttpException;
            if(error instanceof HttpException){
                exception=error;
        }
        else{
            exception=new InternalException('Something went wrong',error,ErrorCode.INTERNAL_EXCEPTION);
        }
        next(exception);
      }
    }
}

//it avoid to write try and catch again and again ,this exception is handled behind the scene 