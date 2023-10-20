"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorsMiddleware = void 0;
const handleErrorsMiddleware = (err, req, res, next) => {
    const error = err.formatError();
    res.status(error.statusCode).send(error.message);
    next();
};
exports.handleErrorsMiddleware = handleErrorsMiddleware;
