import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://localhost:1314";
const client = new MongoClient(url);

// Database Name
const dbName = "linsa-db";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("test-collection");
  console.log("Created Collection:", collection.namespace);

  // the following code examples can be pasted here...
  const insertResult = await collection.insertMany([
    { a: 1 },
    { a: 2 },
    { a: 3 },
  ]);
  console.log("Inserted documents =>", insertResult);

  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  const filteredDocs = (await collection.find({ a: 3 }).toArray())
  filteredDocs.map((doc) => delete doc._id);
  console.log("Found documents filtered by { a: 3 } =>", filteredDocs);

  const updateResult = await collection.updateMany({ a: 3 }, { $set: { b: 1 } });
  console.log("Updated documents =>", updateResult);

  const deleteResult = await collection.deleteMany({ a: 3 });
  console.log("Deleted documents =>", deleteResult);

  const deleteAllResult = await collection.deleteMany();
  console.log("Deleted all documents =>", deleteAllResult);

  return collection.countDocuments();
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
