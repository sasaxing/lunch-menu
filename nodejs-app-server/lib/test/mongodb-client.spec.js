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
        const client = new mongo_client_wrapper_1.MongoClientWrapper();
        (0, chai_1.expect)(client._collection).to.be.undefined;
        yield client.connectDB();
        (0, chai_1.expect)(client._collection).to.be.ok;
        const matchedFoodItems = yield client.queryItemsByName({});
        (0, chai_1.expect)(matchedFoodItems).to.be.not.empty;
        yield client.deleteAllInCollection();
        (0, chai_1.expect)(matchedFoodItems).to.be.empty;
        yield client.disconnectDB();
        // await sleep(10); // to give mongodb enough time to write the initial values
        // const result = await (appServer as any)._queryItemsByName({});
        // expect(result).to.be.not.empty;
        // await appServer!.disconnectDB();
        // expect((appServer as any)._mongodbCollection).to.be.undefined;
        // await sleep(10); // to give mongodb enough time to remove all
    }));
});
