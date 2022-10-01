export interface Food {
    name: string;
    amount: number;
    unit: "gram" | "piece";
    expireDate?: string;
}

export interface MongoDBConfig {
    url: string;
    dbName: string;
    collectionName: string;
}
