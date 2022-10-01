"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServer = void 0;
const http_1 = require("http");
const mongodb_1 = require("mongodb");
class AppServer {
    constructor() {
        this._initialFoodList = [
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
        this._mongoDBConfig = {
            url: 'mongodb://localhost:1314',
            db_name: 'lunch_menu',
            collection: 'food_stock',
        };
        this._server = (0, http_1.createServer)((req, res) => {
            this._log('receiving request', { url: req.url });
            this._handleRequest(req, res);
            res.end();
        });
    }
    setup(port) {
        return __awaiter(this, void 0, void 0, function* () {
            this._server.listen(port, () => {
                this._log('listening on', { port });
            });
        });
    }
    teardown() {
        return __awaiter(this, void 0, void 0, function* () {
            this._server.close();
        });
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._setupMongoDBClient();
        });
    }
    disconnectDB() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this._mongodbCollection) === null || _a === void 0 ? void 0 : _a.deleteMany({}));
            (_b = this._mongodbClient) === null || _b === void 0 ? void 0 : _b.close();
            this._mongodbCollection = undefined;
            this._mongodbClient = undefined;
        });
    }
    _handleRequest(request, response) {
        const method = request.method;
        const url = request.url;
        this._log('handling request', { method, url });
        if (method !== 'GET') {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.write('not-okay');
            return;
        }
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('okay');
    }
    _log(message, arg) {
        console.log('[server]' + message, arg);
    }
    _setupMongoDBClient() {
        return __awaiter(this, void 0, void 0, function* () {
            this._mongodbClient = new mongodb_1.MongoClient(this._mongoDBConfig.url);
            yield this._mongodbClient.connect();
            const db = this._mongodbClient.db(this._mongoDBConfig.db_name);
            this._mongodbCollection = db.collection(this._mongoDBConfig.collection);
            this._putInitialFoodList();
        });
    }
    /**
     *
     * @param query_map if no name provided, then get all documents
     */
    _queryItemsByName(query_map) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const findDocuments = yield ((_a = this._mongodbCollection) === null || _a === void 0 ? void 0 : _a.find(query_map).toArray());
            if (!findDocuments || findDocuments.length === 0) {
                this._log('Nothing found from mongoDb', { name: query_map.name });
                return;
            }
            const matchedFoodItems = findDocuments.map((doc) => {
                delete doc._id;
                return doc;
            });
            return matchedFoodItems;
        });
    }
    _updateMongoDB() { }
    _putInitialFoodList() {
        var _a;
        (_a = this._mongodbCollection) === null || _a === void 0 ? void 0 : _a.insertMany(this._initialFoodList);
    }
}
exports.AppServer = AppServer;
