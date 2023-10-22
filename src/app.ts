import express from 'express';
import { PORT } from './config';
import { AppRoutes } from './AppRoutes';
import { handleErrorsMiddleware } from './middlewares/errorMiddleware';
import './controllers/routes/users/getAllUsersController';
import './controllers/routes/users/getUserByIdController';
import './controllers/routes/users/createUserController';
import './controllers/routes/users/authUserController';
import './controllers/routes/posts/getAllPostsController';
import './controllers/routes/posts/createPostController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AppRoutes.getInstance());
app.use(handleErrorsMiddleware);

app.listen(PORT, () => {
    console.log(`...listening port: ${PORT}`);
});
