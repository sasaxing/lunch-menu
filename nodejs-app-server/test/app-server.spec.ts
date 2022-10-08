import { expect } from 'chai';
import * as http from 'http';
import { AppServer } from '../src/app-server/app-server';
import axios from 'axios'
import { response } from 'express';

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
        await sleep(100);
        await appServer?.teardown()
    });

    beforeEach(async () => {
        await (appServer as any)._mongodbClient.deleteAllInCollection();
    })

    describe('handles basic http requests', () => {
        it('GET: should accept http request', (testDone) => {
            const options = {
                host: '127.0.0.1',
                port: serverPort,
                path: '/any'
            };
              
            const req = http.request(options, (res) => {
                expect(res.statusCode).to.eq(200);

                let body = '';
                res.on('data', function (chunk) {
                    console.log('new body chunk: ' + chunk);
                    body += chunk;

                    if (body === '[]') {
                        testDone();
                    }
                });
            });
            req.end();
        });

        it('GET: should respond 400 on unknown request', (testDone) => {
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

        it('PUT: should add a new food', async () => {
            const url = "http://localhost:" + serverPort;
            const result = await axios.put(url, { 
                name: 'test-put',
                amount: 1,
                unit: 'gram' 
            })

            expect(result.data).deep.include({
                acknowledged: true
            });
        })

        it('DELETE: should delete the food in request', async () => {
            const url = "http://localhost:" + serverPort;
            const testFood = { 
                name: 'test-put',
                amount: 1,
                unit: 'gram' 
            };
            await axios.put(url, testFood);

            let foodInDB = await axios.get(url);
            expect(foodInDB.data).to.deep.include(testFood);
            
            await axios.delete(url, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                data: { name: 'test-put' }
            })

            foodInDB = await axios.get(url);
            expect(foodInDB.data).to.be.empty;
        })

        it('POST: should update an amount in food', async () => {
            const url = "http://localhost:" + serverPort;
            const testFood = { 
                name: 'test-put',
                amount: 2,
                unit: 'gram' 
            };
            await axios.put(url, testFood);
            let foodInDB = await axios.get(url);
            expect(foodInDB.data).to.deep.include(testFood);

            await axios.post(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: {name: 'test-put', update: {"$inc": { "amount": -1 }}}
            })

            foodInDB = await axios.get(url)
            expect(foodInDB.data[0].amount).to.be.eq(1);

            await axios.post(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: {name: 'test-put', update: {"$inc": { "amount": 3 }}}
            })

            foodInDB = await axios.get(url)
            expect(foodInDB.data[0].amount).to.be.eq(4);
        })
    });    
});