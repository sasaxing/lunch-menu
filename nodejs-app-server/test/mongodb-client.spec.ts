import { expect } from 'chai';
import { MongoClientWrapper } from '../src/mongodb-client/mongo-client-wrapper';

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// NOTE: this test needs to run the real mongoDB!
describe('MongoClientWrapper', () => {
    it('happy path', async () => {
        const client = new MongoClientWrapper()
        expect((client as any)._collection).to.be.undefined;

        await client.connectDB()
        expect((client as any)._collection).to.be.ok;

        const matchedFoodItems = await client.queryItemsByName({})
        expect(matchedFoodItems).to.be.not.empty;

        await client.deleteAllInCollection()
        expect(matchedFoodItems).to.be.empty;

        await client.disconnectDB()
        
        // await sleep(10); // to give mongodb enough time to write the initial values

        // const result = await (appServer as any)._queryItemsByName({});
        // expect(result).to.be.not.empty;

        // await appServer!.disconnectDB();
        // expect((appServer as any)._mongodbCollection).to.be.undefined;

        // await sleep(10); // to give mongodb enough time to remove all
    });
})