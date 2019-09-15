import { resolve } from 'path';

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export type Config = {
    APP_NAME: string;
    PORT: number;
    ENVIRONMENT: string;
    STATIC_CONTENT_DIR: string;
    LOG_LEVEL: LogLevel;
};

export function getConfig(env = process.env): Config {
    if (!env.NODE_ENV) {
        throw new Error(`App did not find an environment variable for NODE_ENV.`);
    }

    return {
        APP_NAME: 'socketapp',
        PORT: Number(env.PORT) || 5000,
        ENVIRONMENT: env.NODE_ENV,
        STATIC_CONTENT_DIR: resolve(__dirname, '../../static'),
        LOG_LEVEL: 'trace'
    };
}
