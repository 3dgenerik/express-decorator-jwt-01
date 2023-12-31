import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AppPaths } from '../../../constants';
import { bodyValidator } from '../../../middlewares/bodyValidator';
import { controller, post } from '../../decorators';
import { middleware } from '../../decorators/middleware';
import { CustomError } from '../../../errors/customError';
import { PostsStore } from '../../../models/postsStore';
import { IPost} from '../../../interfaces';
import { headerMiddleware } from '../../../middlewares/headerMiddleware';

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CreatePostController {
    @post(`${AppPaths.ENDPOINT_POSTS}/create`)
    @middleware(bodyValidator(['title', 'content']))
    @middleware(headerMiddleware())
    async createPost(req: Request, res: Response, next: NextFunction) {
        try {

            //custom req property. Defined in app.ts.
            //I'm decided to use middleware for jwt authorization
            const token = req.token

            if(!token)
                throw new CustomError(`Invalid token. Please signin again.`, 401)

            const post = req.body as IPost;
            const store = new PostsStore();
            const addedPost = await store.createPost(
                post,
                Number(token.user.id),
            );

            res.send(addedPost);
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 500));
        }
    }
}
