import * as Koa from 'koa';
import * as http from 'http';
import { Config } from './config';
import { createHealthCheckHandler } from './health-check';
import { createStaticHandler } from './static';
import { Logger } from './logging';

export class HttpServer {
    public http: http.Server;

    constructor(
        private readonly _config: Config,
        private readonly _app: Koa
    ) {
        this.http = http.createServer(this._app.callback());
    }

    public start(): void {
        this.http.listen(this._config.PORT);
    }
}

export function createHttpServer(config: Config, logger: Logger): HttpServer {
    logger.trace('Running init code. Config:', config);

    const app = new Koa();

    app.use(createHealthCheckHandler());
    app.use(createStaticHandler(config.STATIC_CONTENT_DIR));

    return new HttpServer(
        config,
        app
    );
}