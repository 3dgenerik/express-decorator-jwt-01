"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.del = exports.post = exports.get = exports.routeWrapper = void 0;
require("reflect-metadata");
const routeWrapper = (method) => {
    return (path) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        return (target, key) => {
            Reflect.defineMetadata("path" /* AppFeatures.PATH */, path, target, key);
            Reflect.defineMetadata("method" /* AppFeatures.METHOD */, method, target, key);
        };
    };
};
exports.routeWrapper = routeWrapper;
exports.get = (0, exports.routeWrapper)("get" /* AppMethods.GET */);
exports.post = (0, exports.routeWrapper)("post" /* AppMethods.POST */);
exports.del = (0, exports.routeWrapper)("delete" /* AppMethods.DELETE */);
exports.put = (0, exports.routeWrapper)("put" /* AppMethods.PUT */);
