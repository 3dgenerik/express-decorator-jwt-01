import express from 'express';

export class AppRoutes {
    private static instance: express.Router;
    public static getInstance(): express.Router {
        if (!AppRoutes.instance) {
            AppRoutes.instance = express.Router();
        }
        return AppRoutes.instance;
    }
}
