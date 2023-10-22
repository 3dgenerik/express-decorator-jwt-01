import { NextFunction, Request, Response } from 'express';
import { AppPaths } from '../../../constants';
import { controller, get } from '../../decorators';
import { UsersStore } from '../../../models/usersStore';
import { middleware } from '../../decorators/middleware';
import { idParamValidator } from '../../../middlewares/idParamValidator';
import { CustomError } from '../../../errors/customError';

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GetUserById {
    @get(`${AppPaths.ENDPOINT_USERS}/:id`)
    @middleware(idParamValidator())
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const store = new UsersStore();
            const user = await store.getUserByID(Number(id));

            if (!user) throw new CustomError(`User doesn't exists.`, 401);

            res.send(user);
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 422));
        }
    }
}
