import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export const handleErrorsMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction)=>{
    const error = err.formatError()
    res.status(error.statusCode).send(error.message)
    next()
}