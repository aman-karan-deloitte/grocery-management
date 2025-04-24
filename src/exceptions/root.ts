//message,status code,  error codes
export class HttpException extends Error{
    message: string;
    errorcode:any;
    statusCode: number;
    errors:ErrorCode;
    constructor(message: string, statusCode: number, errorcode:any, errors:any) {
        super(message);
        this.message = message; 
        this.statusCode = statusCode;
        this.errorcode = errorcode;
        this.errors = errors;
    }
}

export enum ErrorCode {
        USER_NOT_FOUND = 1001,
        USER_ALREADY_EXISTS = 1002,
        INVALID_CREDENTIALS = 1003,
        INTERNAL_SERVER_ERROR = 5000,
        BAD_REQUEST = 4000,
        UNAUTHORIZED = 4010,
        FORBIDDEN = 4030,
        NOT_FOUND = 4040,
        CONFLICT = 4090,
        UNPROCESSABLE_ENTITY = 4220,
        TOO_MANY_REQUESTS = 4290,
        INTERNAL_EXCEPTION= 3001
    }
