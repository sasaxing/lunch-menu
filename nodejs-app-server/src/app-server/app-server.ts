import { Server } from 'http';
import { MongoClientWrapper } from '../mongodb-client/mongo-client-wrapper';
import { MongoDBConfig } from '../types';
import { log } from '../utils/logger';
import express, { Express } from 'express';
import { Request, Response } from 'express-serve-static-core';
import * as cors from 'cors'

export class AppServer {
    private _expressApp: Express;
    private _expressServer: Server | undefined;
    private _mongodbClient: MongoClientWrapper;

    constructor(mongoDbConfig: MongoDBConfig) {
        this._expressApp = express();
        this._expressApp.use(express.json());
        // this._expressApp.use(cors.default());

        this._mongodbClient = new MongoClientWrapper(mongoDbConfig)
    }

    async setup(port: number) {
        await this._mongodbClient.connectDB();
        this._expressServer = this._expressApp.listen(port, () => {
            log('listening on', {port})
        });

        const corsOptions: cors.CorsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
        }

        this._expressApp.get('*', cors.default(corsOptions), (req, res) => {
            this._handleGETRequest(req, res);
        });

        this._expressApp.delete('*', (req: Request, res: Response) => {
            this._handleDELETERequest(req, res);
        });
    }

    async teardown() {
        await this._mongodbClient.disconnectDB()
        this._expressServer?.close();
    }

    private async _handleGETRequest(request: Request, response: Response) {
        log('GET', { origin: request.headers.origin })
        const currentFoodListInDB = await this._mongodbClient.queryItemsByName({});
        response.json(currentFoodListInDB);
    }

    private async _handleDELETERequest(request: Request, response: Response ) { 
        const deletedResult = await this._mongodbClient.deleteOne(request.body);
        log('DELETE', { deletedResult });
        response.json({ acknowledge: true, deletedCount: 0});
    }
}