import { expect } from 'chai';
import { MongoClientWrapper } from '../src/mongodb-client/mongo-client-wrapper';

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// NOTE: this test needs to run the real mongoDB!
describe('MongoClientWrapper', () => {
    it('happy path', async () => {
        const client = new MongoClientWrapper({
            url: 'mongodb://localhost:1314',
            dbName: 'test-db',
            collectionName: 'db-client-unit-test'
        })

        expect((client as any)._collection).to.be.undefined;

        await client.connectDB()
        expect((client as any)._collection).to.be.ok;
        await sleep(100); // to give mongodb enough time to write the initial values

        const result1 = await client.queryItemsByName({})
        expect(result1?.length).to.be.greaterThan(0);

        await client.deleteAllInCollection();
        await sleep(100); // to give mongodb enough time to remvoe the initial values

        const result2 = await client.queryItemsByName({})
        expect(result2?.length).to.be.eq(0);

        await client.disconnectDB();
    });
})