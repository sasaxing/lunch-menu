import { Collection, MongoClient } from "mongodb";
import { Food, MongoDBConfig } from "../types";
import { log } from "../utils/logger";

export class MongoClientWrapper{
    private _client: MongoClient;
    private _collection: Collection | undefined
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

    constructor(private _mongoDBConfig: MongoDBConfig){
        this._client = new MongoClient(this._mongoDBConfig.url);
    }

    async connectDB() {
        await this._setupMongoDBClient();
    }

    private async _setupMongoDBClient() {
        await this._client.connect()
        const db = this._client.db(this._mongoDBConfig.dbName)
        this._collection = db.collection(this._mongoDBConfig.collectionName)
        this._putInitialFoodList();
    }

    private _putInitialFoodList(){
        this._collection?.insertMany(this._initialFoodList);
    }

    async disconnectDB() {
        this._client.close();

        this._collection = undefined;
    }

    async deleteAllInCollection() {
        await this._collection?.deleteMany({})
    }

    /**
     * 
     * @param query_map if no name provided, then get all documents
     */
     public async queryItemsByName(query_map: {name?: string}): Promise<Food[]> {
        const findDocuments = await this._collection?.find(query_map).toArray();
        if (!findDocuments || findDocuments.length === 0) {
            log('Nothing found from mongoDb', { name: query_map.name });
            return [];
        }

        const matchedFoodItems: Food[] = findDocuments.map((doc: any) => {
            delete doc._id;
            return doc as Food;
        })

        return matchedFoodItems;
    }

    private _updateMongoDB() {}
}