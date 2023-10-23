import { NextFunction, Request, Response } from 'express';
import { AppPaths } from '../../../constants';
import { controller, get } from '../../decorators';
import { CustomError } from '../../../errors/customError';
import { ProfilesStore } from '../../../models/profilesStore';

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GetAllProfilesController {
    @get(AppPaths.ENDPOINT_PROFILES)
    async getAllPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const store = new ProfilesStore();
            const allProfiles = await store.getAllProfiles();
            res.send(allProfiles);
        } catch (err) {
            if (err instanceof CustomError) next(err);
            next(new CustomError(`${err}`, 500));
        }
    }
}
