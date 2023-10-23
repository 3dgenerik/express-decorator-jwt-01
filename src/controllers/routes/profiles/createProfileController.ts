import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AppPaths } from '../../../constants';
import { bodyValidator } from '../../../middlewares/bodyValidator';
import { controller, post } from '../../decorators';
import { middleware } from '../../decorators/middleware';
import { CustomError } from '../../../errors/customError';
import { IProfile} from '../../../interfaces';
import { headerMiddleware } from '../../../middlewares/headerMiddleware';
import { ProfilesStore } from '../../../models/profilesStore';

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CreateProfileController {
    @post(`${AppPaths.ENDPOINT_PROFILES}/create`)
    @middleware(bodyValidator(['first_name', 'last_name', 'date_of_birth']))
    @middleware(headerMiddleware())
    async createPost(req: Request, res: Response, next: NextFunction) {
        try {

            //custom req property. Defined in app.ts.
            //I'm decided to use middleware for jwt authorization
            const token = req.token

            if(!token)
                throw new CustomError(`Invalid token. Please signin again.`, 401)

            const profile = req.body as IProfile;
            const store = new ProfilesStore();
            const addedProfile = await store.createProfile(
                profile,
                Number(token.user.id),
            );

            res.send(addedProfile);
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 500));
        }
    }
}
