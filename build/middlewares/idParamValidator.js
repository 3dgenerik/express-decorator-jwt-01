"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamValidator = void 0;
const customError_1 = require("../errors/customError");
const idParamValidator = () => {
    return (req, res, next) => {
        try {
            const id = req.params.id;
            if (Number.isNaN(Number(id)) || Number(id) < 0)
                throw new customError_1.CustomError('Invalid parameter. Id param should be positive integer.', 422);
            next();
        }
        catch (err) {
            if (err instanceof customError_1.CustomError)
                next(err);
            next(new customError_1.CustomError(`${err}`, 500));
        }
    };
};
exports.idParamValidator = idParamValidator;
