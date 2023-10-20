"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = __importDefault(require("express"));
class AppRoutes {
    static getInstance() {
        if (!AppRoutes.instance) {
            AppRoutes.instance = express_1.default.Router();
        }
        return AppRoutes.instance;
    }
}
exports.AppRoutes = AppRoutes;
