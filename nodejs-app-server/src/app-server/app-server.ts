import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { Collection, MongoClient } from 'mongodb';
import { Food } from '../types';

export class AppServer {
    private _server: Server;
    private _mongodbClient: MongoClient | undefined;
    private _mongodbCollection: Collection | undefined
    private _initialFoodList: Food[] = [
        {
          name: "tomato",
          amount: 4,
          unit: "piece",
        },
        {
          name: "potato",
          amount: 3,
          unit: "piece",
        },
        {
          name: "beef",
          amount: 500,
          unit: "gram",
        },
        {
          name: "egg",
          amount: 14,
          unit: "piece",
        },
    ];
    
    private _mongoDBConfig = {
        url: 'mongodb://localhost:1314',
        db_name: 'lunch_menu',
        collection: 'food_stock',
    }

    constructor() {
        this._server = createServer((req, res) => {
            this._log('receiving request',{ url: req.url})

            this._handleRequest(req, res);
            res.end();
        });
        
    }

    async setup(port: number) {
        this._server.listen(port, () => {
            this._log('listening on', {port})
        });
    }

    async teardown() {
        this._server.close();
    }

    async connectDB() {
        await this._setupMongoDBClient();
    }

    async disconnectDB() {
        await this._mongodbCollection?.deleteMany({});

        this._mongodbClient?.close();

        this._mongodbCollection = undefined;
        this._mongodbClient = undefined;
    }

    private _handleRequest(request: IncomingMessage, response: ServerResponse<IncomingMessage> ) {
        const method = request.method;
        const url = request.url;
        this._log('handling request', { method, url })

        if (method !== 'GET') {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.write('not-okay');
            return;
        }

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('okay');
    }

    private _log(message: string, arg?: any) {
        console.log('[server]' + message, arg);
    }

    private async _setupMongoDBClient() {
        this._mongodbClient = new MongoClient(this._mongoDBConfig.url)
        await this._mongodbClient.connect()
        const db = this._mongodbClient.db(this._mongoDBConfig.db_name)
        this._mongodbCollection = db.collection(this._mongoDBConfig.collection)
        this._putInitialFoodList();
    }

    /**
     * 
     * @param query_map if no name provided, then get all documents
     */
    private async _queryItemsByName(query_map: {name?: string}): Promise<Food[] | undefined> {
        const findDocuments = await this._mongodbCollection?.find(query_map).toArray();
        if (!findDocuments || findDocuments.length === 0) {
            this._log('Nothing found from mongoDb', { name: query_map.name });
            return;
        }

        const matchedFoodItems: Food[] = findDocuments.map((doc: any) => {
            delete doc._id;
            return doc as Food;
        })

        return matchedFoodItems;
    }

    private _updateMongoDB() {}

    private _putInitialFoodList(){
        this._mongodbCollection?.insertMany(this._initialFoodList);
    }

}