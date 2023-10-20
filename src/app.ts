import express from 'express';
import { PORT } from './config';
import { AppRoutes } from './AppRoutes';
import './controllers/routes/users/getAllUsersController'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AppRoutes.getInstance());

app.listen(PORT, () => {
    console.log(`...listening port: ${PORT}`);
});
