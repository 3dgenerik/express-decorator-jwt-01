"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    formatError() {
        return {
            message: this.message,
            statusCode: this.statusCode,
        };
    }
}
exports.CustomError = CustomError;
