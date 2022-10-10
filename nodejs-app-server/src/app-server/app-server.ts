import { Server } from 'http';
import { MongoClientWrapper } from '../mongodb-client/mongo-client-wrapper';
import { MongoDBConfig } from '../types';
import { log } from '../utils/logger';
import express, { Express } from 'express';
import { Request, Response } from 'express-serve-static-core';
import cors from 'cors'

export class AppServer {
    private _expressApp: Express;
    private _expressServer: Server | undefined;
    private _mongodbClient: MongoClientWrapper;

    constructor(mongoDbConfig: MongoDBConfig) {
        this._expressApp = express();
        this._expressApp.use(express.json());
        this._expressApp.use(cors());

        this._mongodbClient = new MongoClientWrapper(mongoDbConfig)
    }

    async setup(port: number) {
        await this._mongodbClient.connectDB();
        this._expressServer = this._expressApp.listen(port, () => {
            log('listening on', {port})
        });

        const corsOptions: cors.CorsOptions = {
            origin: 'http://localhost',
            optionsSuccessStatus: 222,
        }

        this._expressApp.get('*', (req, res) => {
            this._handleGETRequest(req, res);
        });

        this._expressApp.delete('*', (req: Request, res: Response) => {
            this._handleDELETERequest(req, res);
        });

        this._expressApp.put('*', (req: Request, res: Response) => {
            this._handlePUTRequest(req, res);
        });

        this._expressApp.post('*', (req: Request, res: Response) => {
            this._handlePOSTRequest(req, res);
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
        const toDelete = request.body;
        log('DELETE', { toDelete });
        const deletedResult = await this._mongodbClient.deleteOne(toDelete);
        response.json(deletedResult);
    }

    private async _handlePUTRequest(request: Request, response: Response ) { 
        const newFood = request.body;
        log('PUT', { newFood });
        const putResult = await this._mongodbClient.addFood(newFood);
        response.json(putResult);
    }

    private async _handlePOSTRequest(request: Request, response: Response) {
        const updateMap = request.body.data;
        log('POST', updateMap)
        const updateResult = await this._mongodbClient.updateAmount(updateMap)
        response.json(updateResult)
    }
}