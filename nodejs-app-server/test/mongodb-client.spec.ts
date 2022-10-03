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

        expect((await client.queryItemsByName({}))?.length).to.be.eq(0);

        await client.addFood({
            name: 'cheese',
            amount: 200,
            unit:'gram',
        });
        await sleep(50); // to give mongodb enough time to update

        expect((await client.queryItemsByName({}))?.length).to.be.eq(1);

        // await client.deleteAllInCollection();
        // await sleep(50); // to give mongodb enough time to update
        
        // expect((await client.queryItemsByName({}))?.length).to.be.eq(0);

        await client.disconnectDB();
    });
})