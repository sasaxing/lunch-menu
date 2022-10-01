import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { MongoClientWrapper } from '../mongodb-client/mongo-client-wrapper';
import { MongoDBConfig } from '../types';
import { log } from '../utils/logger';

export class AppServer {
    private _server: Server;
    private _mongodbClient: MongoClientWrapper;

    constructor(mongoDbConfig: MongoDBConfig) {
        this._server = createServer((req, res) => {
            log('receiving request',{ url: req.url})

            this._handleRequest(req, res);
            res.end();
        });

        this._mongodbClient = new MongoClientWrapper(mongoDbConfig)
    }

    async setup(port: number) {
        await this._mongodbClient.connectDB()
        this._server.listen(port, () => {
            log('listening on', {port})
        });
    }

    async teardown() {
        await this._mongodbClient.disconnectDB()
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