"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const AppRoutes_1 = require("./AppRoutes");
require("./controllers/routes/users/getAllUsersController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(AppRoutes_1.AppRoutes.getInstance());
app.listen(config_1.PORT, () => {
    console.log(`...listening port: ${config_1.PORT}`);
});
