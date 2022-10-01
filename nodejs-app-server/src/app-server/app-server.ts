import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { Collection, MongoClient } from 'mongodb';
import { Food } from '../types';
import { log } from '../utils/logger';

export class AppServer {
    private _server: Server;

    constructor() {
        this._server = createServer((req, res) => {
            log('receiving request',{ url: req.url})

            this._handleRequest(req, res);
            res.end();
        });
        
    }

    async setup(port: number) {
        this._server.listen(port, () => {
            log('listening on', {port})
        });
    }

    async teardown() {
        this._server.close();
    }

    private _handleRequest(request: IncomingMessage, response: ServerResponse<IncomingMessage> ) {
        const method = request.method;
        const url = request.url;
        log('handling request', { method, url })

        if (method !== 'GET') {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.write('not-okay');
            return;
        }

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('okay');
    }

    

    

    

    

}