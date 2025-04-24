import { HttpException } from "./root";

export class UnauthorisedException extends HttpException {
    constructor(message: string, errorcode:number, errors:any) {
        super(message, 401, errorcode,errors);
    }
}