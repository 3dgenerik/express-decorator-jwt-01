"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyValidator_1 = require("../../../middlewares/bodyValidator");
const decorators_1 = require("../../decorators");
const middleware_1 = require("../../decorators/middleware");
const customError_1 = require("../../../errors/customError");
const postsStore_1 = require("../../../models/postsStore");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config");
let CreatePostController = 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CreatePostController {
    createPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get authorization from header and take id from user
                const authorizationHeader = req.headers.authorization;
                const token = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1]) || "";
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET_TOKEN);
                const post = req.body;
                const store = new postsStore_1.PostsStore();
                const addedPost = yield store.createPost(post, Number(decoded.user.id));
                res.send(addedPost);
            }
            catch (err) {
                if (err instanceof customError_1.CustomError)
                    next(err);
                next(new customError_1.CustomError(`${err}`, 500));
            }
        });
    }
};
__decorate([
    (0, decorators_1.post)(`${"/posts" /* AppPaths.ENDPOINT_POSTS */}/create`),
    (0, middleware_1.middleware)((0, bodyValidator_1.bodyValidator)(['title', 'content'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CreatePostController.prototype, "createPost", null);
CreatePostController = __decorate([
    (0, decorators_1.controller)("/api" /* AppPaths.PATH_PREFIX */)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
], CreatePostController);
