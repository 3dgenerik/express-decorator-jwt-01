import { NextFunction, Request, Response } from 'express';
import { AppPaths } from '../../../constants';
import { controller, get } from '../../decorators';
import { UsersStore } from '../../../models/usersStore';
import { CustomError } from '../../../errors/customError';
import { middleware } from '../../decorators/middleware';
import { headerMiddleware } from '../../../middlewares/headerMiddleware';

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GetAllUsersController {
    @get(`${AppPaths.ENDPOINT_USERS}/:type`)
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const type = req.params.type;
            const store = new UsersStore();
            const users = await store.getAllUsers(
                type === 'long' ? true : false,
            );
            res.send(users);
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 500));
        }
    }
}
