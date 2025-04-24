import { HttpException } from "./root";

export class BadRequestException extends HttpException {
    constructor(message: string, errorcode:any, error:any) {
        super(message, 400, errorcode, null);
    }
}