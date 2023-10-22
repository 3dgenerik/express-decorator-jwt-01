"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const AppRoutes_1 = require("./AppRoutes");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
require("./controllers/routes/users/getAllUsersController");
require("./controllers/routes/users/getUserByIdController");
require("./controllers/routes/users/createUserController");
require("./controllers/routes/users/authUserController");
require("./controllers/routes/posts/getAllPostsController");
require("./controllers/routes/posts/createPostController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(AppRoutes_1.AppRoutes.getInstance());
app.use(errorMiddleware_1.handleErrorsMiddleware);
app.listen(config_1.PORT, () => {
    console.log(`...listening port: ${config_1.PORT}`);
});
