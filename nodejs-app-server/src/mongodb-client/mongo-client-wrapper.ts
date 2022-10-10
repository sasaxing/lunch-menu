import { Collection, MongoClient } from "mongodb";
import { Food, MongoDBConfig } from "../types";
import { log } from "../utils/logger";

export class MongoClientWrapper{
    private _client: MongoClient;
    private _collection: Collection | undefined;

    constructor(private _mongoDBConfig: MongoDBConfig){
        this._client = new MongoClient(this._mongoDBConfig.url);
        // this._client = new MongoClient(this._mongoDBConfig.url, { replicaSet: 'rs0' });
    }

    async connectDB() {
        return this._setupMongoDBClient();
    }

    private async _setupMongoDBClient() {
        await this._client.connect()
        const db = this._client.db(this._mongoDBConfig.dbName)
        this._collection = db.collection(this._mongoDBConfig.collectionName)
        // const changeStream = this._collection.watch();
        // changeStream.on('change', next => {
        //     // process next document
        //     log("change happens")
        // });
    }

    async addFood(newFood: Food): Promise<any> {
        return this._collection?.insertOne(newFood);
    }

    async disconnectDB() {
        this._client.close();

        this._collection = undefined;
    }

    async deleteAllInCollection() {
        return this._collection?.deleteMany({})
    }


    async deleteOne(item: Food) {
        return this._collection?.findOneAndDelete(item);
    }

    async updateAmount(updateMap: any){
        return this._collection?.findOneAndUpdate({'name': updateMap.name}, updateMap.update, { returnDocument: 'after' });
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