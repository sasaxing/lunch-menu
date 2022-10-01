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
        appServer = new AppServer({
            url: 'mongodb://localhost:1314',
            dbName: 'test-db',
            collectionName: 'app-server-unit-test'
        });
        await appServer.setup(serverPort);
    });

    after(async () => {
        await (appServer as any)._mongodbClient.deleteAllInCollection();
        await sleep(100);
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
    
    
    
});