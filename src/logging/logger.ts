import * as bunyan from 'bunyan';
import { Config } from '../config';

export interface Logger {
    trace(obj: Object, ...params: any[]): void;
    trace(format: any, ...params: any[]): void;
    info(obj: Object, ...params: any[]): void;
    info(format: any, ...params: any[]): void;
    error(error: Error, ...params: any[]): void;
    error(obj: Object, ...params: any[]): void;
    error(format: any, ...params: any[]): void;
}

export const createLogger = (config: Config): Logger => {
    return bunyan.createLogger({
        name: config.APP_NAME,
        level: config.LOG_LEVEL
    });
};
