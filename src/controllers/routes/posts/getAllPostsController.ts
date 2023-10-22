import { NextFunction, Request, Response } from "express";
import { AppPaths } from "../../../constants";
import { controller, get } from "../../decorators";
import { CustomError } from "../../../errors/customError";
import { PostsStore } from "../../../models/postsStore";

@controller(AppPaths.PATH_PREFIX)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GetAllPosts{
    @get(AppPaths.ENDPOINT_POSTS)
    async getAllPosts(req: Request, res: Response, next: NextFunction){
        try{
            const store = new PostsStore()
            const allPosts = await store.getAllPosts()
            res.send(allPosts)

        }catch(err){
            if(err instanceof CustomError)
                next(err)
            next(new CustomError(`${err}`, 500))
        }
    }
}