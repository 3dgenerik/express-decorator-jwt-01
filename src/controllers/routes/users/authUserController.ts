import { NextFunction, Request, Response } from 'express';
import { AppPaths } from '../../../constants';
import { controller, post } from '../../decorators';
import { middleware } from '../../decorators/middleware';
import { bodyValidator } from '../../../middlewares/bodyValidator';
import { CustomError } from '../../../errors/customError';
import { UsersStore } from '../../../models/usersStore';
import { IUser } from '../../../interfaces';
import { SECRET_TOKEN } from '../../../config';
import jwt from 'jsonwebtoken';

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class authUser {
    @post(`${AppPaths.ENDPOINT_USERS}/signin`)
    @middleware(bodyValidator(['name', 'email', 'password']))
    async authUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUser;
            const store = new UsersStore();
            const newUser = await store.authUser(user);

            if (!newUser) {
                throw new CustomError(
                    `User with provided info doesn't exist. Please try again.`,
                    401,
                );
            }

            const token = jwt.sign({ user: newUser }, SECRET_TOKEN);

            res.send(token);
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 422));
        }
    }
}
