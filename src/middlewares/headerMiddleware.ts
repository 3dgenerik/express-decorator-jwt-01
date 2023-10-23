import { NextFunction, Request, RequestHandler, Response } from "express"
import { IUserJWT } from "../interfaces";
import { SECRET_TOKEN } from "../config";
import jwt from 'jsonwebtoken';
import { CustomError } from "../errors/customError";


export const headerMiddleware = ():RequestHandler=>{
    return (req: Request, res: Response, next: NextFunction)=>{
        try{
            const authorizationHeader = req.headers.authorization;
            const token = authorizationHeader?.split(' ')[1] || '';
            const decoded = jwt.verify(token, SECRET_TOKEN) as IUserJWT;
            
            if(!decoded)
                throw new CustomError(`Invalid token. Please signin again.`, 401)
        
            req.token = decoded
            next();
        }catch(err){
            if(err instanceof CustomError)
                next(err)
            next( new CustomError(`${err}`, 401))
        }
    }
}