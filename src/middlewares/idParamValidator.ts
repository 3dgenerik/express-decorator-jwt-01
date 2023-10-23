import { NextFunction, Request, RequestHandler, Response } from 'express';
import { CustomError } from '../errors/customError';

export const idParamValidator = ():RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as unknown as string;

            if (Number.isNaN(Number(id)) || Number(id) < 0)
                throw new CustomError(
                    'Invalid parameter. Id param should be positive integer.',
                    422,
                );

            next();
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 500));
        }
    };
};
