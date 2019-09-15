import * as http from 'http';
import * as socketIo from 'socket.io';
import { HttpServer } from '../http-server';
import { Config } from '../config';
import { Logger } from '../logging';

export class SocketServer {
    private _io: socketIo.Server;

    constructor(
        private readonly _http: http.Server,
        private readonly _logger: Logger
    ) {
        this._io = socketIo(this._http);

        this._io.on('connection', (socket) => {
            this._logger.log('a user connected');

            socket.on('disconnect', () => {
                this._logger.log('user disconnected');
            });

            socket.on('chat message', (msg) => {
                this._io.emit('chat message', msg);
            });
        });
    }
}

export const createSocketServer = (
    config: Config,
    httpServer: HttpServer,
    logger: Logger
) => {
    return new SocketServer(httpServer.http, logger);
};
