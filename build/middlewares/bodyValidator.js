"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
const customError_1 = require("../errors/customError");
const bodyValidator = (keys) => {
    return (req, res, next) => {
        try {
            const body = req.body;
            for (const key of keys) {
                if (!body[key]) {
                    throw new customError_1.CustomError(`Missing values: ${[...keys]}`, 400);
                }
            }
        }
        catch (err) {
            if (err instanceof customError_1.CustomError)
                next(err);
            next(new customError_1.CustomError(`${err}`, 500));
        }
    };
};
exports.bodyValidator = bodyValidator;
