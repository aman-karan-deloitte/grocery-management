import { HttpException } from "./root";

export class InternalException extends HttpException{
    constructor(message:string,errorcode:number,error:any){
        super(message,500,errorcode,error);
    }
}