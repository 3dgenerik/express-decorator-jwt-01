"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerMiddleware = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = require("../errors/customError");
const headerMiddleware = () => {
    return (req, res, next) => {
        try {
            const authorizationHeader = req.headers.authorization;
            const token = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1]) || '';
            const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET_TOKEN);
            if (!decoded)
                throw new customError_1.CustomError(`Invalid token. Please signin again.`, 401);
            req.token = decoded;
            next();
        }
        catch (err) {
            if (err instanceof customError_1.CustomError)
                next(err);
            next(new customError_1.CustomError(`${err}`, 401));
        }
    };
};
exports.headerMiddleware = headerMiddleware;
