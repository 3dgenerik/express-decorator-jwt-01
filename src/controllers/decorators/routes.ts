import 'reflect-metadata';
import { AppFeatures, AppMethods } from '../../constants';

export const routeWrapper = (method: AppMethods) => {
    return (path: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        return (target: any, key: string) => {
            Reflect.defineMetadata(AppFeatures.PATH, path, target, key);
            Reflect.defineMetadata(AppFeatures.METHOD, method, target, key);
        };
    };
};

export const get = routeWrapper(AppMethods.GET);
export const post = routeWrapper(AppMethods.POST);
export const del = routeWrapper(AppMethods.DELETE);
export const put = routeWrapper(AppMethods.PUT);
