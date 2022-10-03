import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { MongoClientWrapper } from '../mongodb-client/mongo-client-wrapper';
import { MongoDBConfig } from '../types';
import { log } from '../utils/logger';

export class AppServer {
    private _server: Server;
    private _mongodbClient: MongoClientWrapper;

    constructor(mongoDbConfig: MongoDBConfig) {
        this._server = createServer(async (req, res) => {
            log('receiving request',{ url: req.url})

            await this._handleRequest(req, res);
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

    private async _handleRequest(request: IncomingMessage, response: ServerResponse<IncomingMessage> ) {
        const method = request.method;
        const url = request.url;
        log('handling request', { method, url })

        switch (method) {
            case 'GET':
                await this._handleGETRequest(request, response);
                break;
            case 'DELETE':
                // TODO: handle delete
                return this._handleDELETERequest(request, response)
            case 'PUT':
            case 'POST':
                // TODO: handle post
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.write('okay');
                break;
            default:
                response.writeHead(400, { 'Content-Type': 'text/plain' });
                response.write('not-okay');
                return;
        }
    }

    private async _handleGETRequest(
        request: IncomingMessage,
        response: ServerResponse<IncomingMessage>
    ) {
        const currentFoodListInDB = await this._mongodbClient.queryItemsByName({});
        response.writeHead(200, {
            'Content-Type': 'text/plain',
            "Access-Control-Allow-Origin": "*" 
        });
        response.write(JSON.stringify(currentFoodListInDB));
    }

    private async _handleDELETERequest(request: IncomingMessage, response: ServerResponse<IncomingMessage> ) { 
        console.log("request is ", request)
        request.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
    }


}