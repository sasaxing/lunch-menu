// import { Collection, MongoClient } from "mongodb";
import type { Food } from "../types";
import { reactive } from "vue";

/*
export async function setupDB(): Promise<Collection<any>> {
  const url = "mongodb://localhost:1314";
  const client = new MongoClient(url);
  await client.connect();

  const dbName = "ts-client-db";
  const db = client.db(dbName);
  const collection = db.collection("ts-client-collection");
  return collection;
}
*/

export const testFoodList: Food[] = reactive([
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
]);
