"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mongo_client_wrapper_1 = require("../src/mongodb-client/mongo-client-wrapper");
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
// NOTE: this test needs to run the real mongoDB!
describe('MongoClientWrapper', () => {
    it('happy path', () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new mongo_client_wrapper_1.MongoClientWrapper({
            url: 'mongodb://localhost:1314',
            dbName: 'test-db',
            collectionName: 'db-client-unit-test'
        });
        (0, chai_1.expect)(client._collection).to.be.undefined;
        yield client.connectDB();
        (0, chai_1.expect)(client._collection).to.be.ok;
        yield sleep(100); // to give mongodb enough time to write the initial values
        const result1 = yield client.queryItemsByName({});
        (0, chai_1.expect)(result1 === null || result1 === void 0 ? void 0 : result1.length).to.be.greaterThan(0);
        yield client.deleteAllInCollection();
        yield sleep(100); // to give mongodb enough time to remvoe the initial values
        const result2 = yield client.queryItemsByName({});
        (0, chai_1.expect)(result2 === null || result2 === void 0 ? void 0 : result2.length).to.be.eq(0);
        yield client.disconnectDB();
    }));
});
