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
exports.MongoClientWrapper = void 0;
const mongodb_1 = require("mongodb");
const logger_1 = require("../utils/logger");
class MongoClientWrapper {
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
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._setupMongoDBClient();
        });
    }
    _setupMongoDBClient() {
        return __awaiter(this, void 0, void 0, function* () {
            this._client = new mongodb_1.MongoClient(this._mongoDBConfig.url);
            yield this._client.connect();
            const db = this._client.db(this._mongoDBConfig.db_name);
            this._collection = db.collection(this._mongoDBConfig.collection);
            this._putInitialFoodList();
        });
    }
    _putInitialFoodList() {
        var _a;
        (_a = this._collection) === null || _a === void 0 ? void 0 : _a.insertMany(this._initialFoodList);
    }
    disconnectDB() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this._client) === null || _a === void 0 ? void 0 : _a.close();
            this._collection = undefined;
            this._client = undefined;
        });
    }
    deleteAllInCollection() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.deleteMany({}));
        });
    }
    /**
     *
     * @param query_map if no name provided, then get all documents
     */
    queryItemsByName(query_map) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const findDocuments = yield ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.find(query_map).toArray());
            if (!findDocuments || findDocuments.length === 0) {
                (0, logger_1.log)('Nothing found from mongoDb', { name: query_map.name });
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
}
exports.MongoClientWrapper = MongoClientWrapper;
