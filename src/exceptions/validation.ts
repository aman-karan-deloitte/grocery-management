import { HttpException } from "./root";

export class UnprocessableEntity extends HttpException{
    constructor(message: string, errorcode:number, error:any) {
        super(message, 422, errorcode, error);
    }
}