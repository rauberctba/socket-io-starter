import { Middleware } from 'koa';
import * as routes from 'koa-route';

const DEFAULT_PATH = '/health-check';
type HealthCheckOptions = { path: string };

export const createHealthCheckHandler = ((options?: HealthCheckOptions): Middleware => {

    const { path = DEFAULT_PATH } = options || {};

    const handler = async (context: any, next: () => Promise<any>): Promise<any> => {
        await next();

        context.body = {
            timestamp: Date.now(),
            uptime: process.uptime()
        };
    };

    return routes.get(path, handler);
});
