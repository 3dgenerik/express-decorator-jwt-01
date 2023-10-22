import { NextFunction, Request, Response } from "express";
import { AppPaths } from "../../../constants";
import { bodyValidator } from "../../../middlewares/bodyValidator";
import { controller, post} from "../../decorators";
import { middleware } from "../../decorators/middleware";
import { CustomError } from "../../../errors/customError";
import { PostsStore } from "../../../models/postsStore";
import { IPost, IUserJWT } from "../../../interfaces";
import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from "../../../config";

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CreatePostController{
    @post(`${AppPaths.ENDPOINT_POSTS}/create`)
    @middleware(bodyValidator(['title', 'content']))
    async createPost(req: Request, res: Response, next: NextFunction){
        try{
            //get authorization from header and take id from user
            const authorizationHeader = req.headers.authorization
            const token = authorizationHeader?.split(' ')[1] || ""
            const decoded = jwt.verify(token, SECRET_TOKEN) as IUserJWT

            const post = req.body as IPost;
            const store = new PostsStore()
            const addedPost = await store.createPost(post, Number(decoded.user.id))


            res.send(addedPost)
        }catch(err){
            if(err instanceof CustomError)
                next(err)
            next(new CustomError(`${err}`, 500))
        }
    }
}