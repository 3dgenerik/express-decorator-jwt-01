import { NextFunction, Request, Response } from 'express';
import { AppPaths } from '../../../constants';
import { controller, post } from '../../decorators';
import { middleware } from '../../decorators/middleware';
import { bodyValidator } from '../../../middlewares/bodyValidator';
import { CustomError } from '../../../errors/customError';
import { UsersStore } from '../../../models/usersStore';
import { IUser } from '../../../interfaces';
import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../../../config';

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CreateUser {
    @post(`${AppPaths.ENDPOINT_USERS}/signup`)
    @middleware(bodyValidator(['name', 'email', 'password', 'avatars_id']))
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUser;
            const store = new UsersStore();
            const newUser = await store.createUser(user);

            if (!newUser){
                throw new CustomError(
                    `User with name ${user.name} already exists`,
                    401,
                );
            }

            const token = jwt.sign({user: newUser}, SECRET_TOKEN)
            res.send(token);
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 422));
        }
    }
}
