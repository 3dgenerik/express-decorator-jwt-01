import { NextFunction, Request, Response } from "express"
import { CustomError } from "../errors/customError";

export const bodyValidator = (keys: string[])=>{
    return (req: Request, res: Response, next: NextFunction)=>{
        try{            
            const body = req.body;
            for (const key of keys) {
                if(!body[key]){
                    throw new CustomError(`Missing values: ${[...keys]}`, 400)
                }
            }
        }catch(err){
            if(err instanceof CustomError)
                next(err)
            next(new CustomError(`${err}`, 500))
        }
    }
}