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
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../decorators");
const usersStore_1 = require("../../../models/usersStore");
const middleware_1 = require("../../decorators/middleware");
const idParamValidator_1 = require("../../../middlewares/idParamValidator");
const customError_1 = require("../../../errors/customError");
let GetUserById = 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GetUserById {
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const store = new usersStore_1.UsersStore();
                const user = yield store.getUserByID(Number(id));
                if (!user)
                    throw new customError_1.CustomError(`User doesn't exists.`, 401);
                res.send(user);
            }
            catch (err) {
                if (err instanceof customError_1.CustomError)
                    next(err);
                next(new customError_1.CustomError(`${err}`, 422));
            }
        });
    }
};
__decorate([
    (0, decorators_1.get)(`${"/users" /* AppPaths.ENDPOINT_USERS */}/:id`),
    (0, middleware_1.middleware)((0, idParamValidator_1.idParamValidator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], GetUserById.prototype, "getUserById", null);
GetUserById = __decorate([
    (0, decorators_1.controller)("/api" /* AppPaths.PATH_PREFIX */)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
], GetUserById);
