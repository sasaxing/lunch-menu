"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http = __importStar(require("http"));
const app_server_1 = require("../src/app-server/app-server");
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
describe('nodejs app server', () => {
    let appServer;
    const serverPort = 3000;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        appServer = new app_server_1.AppServer();
        yield appServer.setup(serverPort);
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (appServer === null || appServer === void 0 ? void 0 : appServer.teardown());
    }));
    describe('handles basic http requests', () => {
        it('should accept http request', (testDone) => {
            const options = {
                host: '127.0.0.1',
                port: serverPort,
                path: '/length_request'
            };
            const req = http.request(options, (res) => {
                (0, chai_1.expect)(res.statusCode).to.eq(200);
                testDone();
            });
            req.end();
        });
        it('should respond 400 on unknown request', (testDone) => {
            const options = {
                host: '127.0.0.1',
                port: serverPort,
                method: 'badbad'
            };
            const req = http.request(options, (res) => {
                (0, chai_1.expect)(res.statusCode).to.eq(400);
                testDone();
            });
            req.end();
        });
    });
    // NOTE: this test needs to run the real mongoDB!
    describe('deals with Mongodb', () => {
        it('happy path', () => __awaiter(void 0, void 0, void 0, function* () {
            yield appServer.connectDB();
            (0, chai_1.expect)(appServer._mongodbCollection).to.be.ok;
            yield sleep(10); // to give mongodb enough time to write the initial values
            const result = yield appServer._queryItemsByName({});
            (0, chai_1.expect)(result).to.be.not.empty;
            yield appServer.disconnectDB();
            (0, chai_1.expect)(appServer._mongodbCollection).to.be.undefined;
            yield sleep(10); // to give mongodb enough time to remove all
        }));
    });
});