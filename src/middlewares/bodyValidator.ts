import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/customError';

export const bodyValidator = (keys: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const emptyValues = []
            for (const key of keys) {
                if (!body[key]) {
                    emptyValues.push(key)
                }
            }
            if(emptyValues.length > 0)
                throw new CustomError(`Missing values: ${[...emptyValues]}`, 400);

            next()
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 500));
        }
    };
};
