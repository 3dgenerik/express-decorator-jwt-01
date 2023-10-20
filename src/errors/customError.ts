import { ICustomError } from "../interfaces";

export class CustomError extends Error{
    private statusCode: number;
    constructor(message: string, statusCode: number){
        super(message)
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError)
    }

    formatError():ICustomError{
        return {
            message: this.message,
            statusCode: this.statusCode
        }
    }
}