import { Request, Response } from 'express';
import { AppPaths } from '../../../constants';
import { controller, get } from '../../decorators';

@controller(AppPaths.PATH_PREFIX)
class GetAllUsersController {
    @get(`${AppPaths.ENDPOINT_USERS}`)
    getUsers(req: Request, res: Response) {
        res.send('OK');
    }
}
