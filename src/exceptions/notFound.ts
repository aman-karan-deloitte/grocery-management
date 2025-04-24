import { HttpException } from "./root";

export class NotFoundException extends HttpException {
    constructor(message: string, errorcode:any, error:any) {
        super(message, 404, errorcode, null);
    }
}