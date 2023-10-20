import { AppRoutes } from '../../AppRoutes';
import 'reflect-metadata';
import { AppFeatures, AppMethods } from '../../constants';

export const controller = (routePrefix: string) => {
    return (target: Function) => {
        const router = AppRoutes.getInstance();
        const targetPrototype = Object.getOwnPropertyNames(target.prototype);
        for (const key of targetPrototype) {
            const path = Reflect.getMetadata(AppFeatures.PATH, target.prototype, key) as string;
            const method = Reflect.getMetadata(AppFeatures.METHOD, target.prototype, key) as AppMethods;

            if(path && method){
                router[method](`${routePrefix}${path}`, target.prototype[key])
            }
        }
    };
};
