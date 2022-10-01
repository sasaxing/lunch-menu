import { expect } from 'chai';
import * as http from 'http';
import { AppServer } from '../src/app-server/app-server';


async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('nodejs app server', () => {
    let appServer: AppServer | undefined;
    const serverPort = 3000;

    before(async () => {
        appServer = new AppServer();
        await appServer.setup(serverPort);
    });

    after(async () => {
        await appServer?.teardown()
    });

    describe('handles basic http requests', () => {
        it('should accept http request', (testDone) => {
            const options = {
                host: '127.0.0.1',
                port: serverPort,
                path: '/length_request'
            };
              
            const req = http.request(options, (res) => {
                expect(res.statusCode).to.eq(200);
                testDone();
            });
    
            req.end();
        });
      
    
        it('should respond 400 on unknown request', (testDone) => {
            const options: http.RequestOptions = {
                host: '127.0.0.1',
                port: serverPort,
                method: 'badbad'
            };
              
            const req = http.request(options, (res) => {
                expect(res.statusCode).to.eq(400);
                testDone();
            });
    
            req.end();
        });
    })
    
    // NOTE: this test needs to run the real mongoDB!
    describe('deals with Mongodb', () => {
        it('happy path', async () => {
            await appServer!.connectDB();
            expect((appServer as any)._mongodbCollection).to.be.ok;


            await sleep(10); // to give mongodb enough time to write the initial values

            const result = await (appServer as any)._queryItemsByName({});
            expect(result).to.be.not.empty;

            await appServer!.disconnectDB();
            expect((appServer as any)._mongodbCollection).to.be.undefined;

            await sleep(10); // to give mongodb enough time to remove all
        });
    })
});