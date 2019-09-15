import { createHttpServer } from './src/http-server';
import { getConfig } from './src/config';
import { createSocketServer } from './src/socket';
import { createLogger } from './src/logging';

const config = getConfig();
const logger = createLogger(config);
const http = createHttpServer(config, logger);
createSocketServer(config, http, logger);
http.start();
