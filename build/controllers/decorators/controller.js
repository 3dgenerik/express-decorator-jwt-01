"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const AppRoutes_1 = require("../../AppRoutes");
require("reflect-metadata");
const controller = (routePrefix) => {
    return (target) => {
        const router = AppRoutes_1.AppRoutes.getInstance();
        const targetPrototype = Object.getOwnPropertyNames(target.prototype);
        for (const key of targetPrototype) {
            const path = Reflect.getMetadata("path" /* AppFeatures.PATH */, target.prototype, key);
            const method = Reflect.getMetadata("method" /* AppFeatures.METHOD */, target.prototype, key);
            const middleware = Reflect.getMetadata("middleware" /* AppFeatures.MIDDLEWARE */, target.prototype, key) || [];
            if (path && method) {
                router[method](`${routePrefix}${path}`, [...middleware], target.prototype[key]);
            }
        }
    };
};
exports.controller = controller;
