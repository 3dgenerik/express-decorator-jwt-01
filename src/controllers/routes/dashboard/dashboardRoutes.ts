import { NextFunction, Request, Response } from 'express';
import { AppPaths } from '../../../constants';
import { controller, get } from '../../decorators';
import { CustomError } from '../../../errors/customError';
import { DashboardQueries } from '../../../services/dashboard';

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class dashboardRoutes {
    @get(`${AppPaths.ENDPOINT_USERS}/:id${AppPaths.ENDPOINT_POSTS}`)
    async getAllPostsFromUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const store = new DashboardQueries();
            const postsPerUser = await store.userPosts(Number(id));
            res.send(postsPerUser);
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 500));
        }
    }
}
