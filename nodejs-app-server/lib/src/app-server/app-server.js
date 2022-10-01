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
exports.AppServer = void 0;
const http_1 = require("http");
const logger_1 = require("../utils/logger");
class AppServer {
    constructor() {
        this._server = (0, http_1.createServer)((req, res) => {
            (0, logger_1.log)('receiving request', { url: req.url });
            this._handleRequest(req, res);
            res.end();
        });
    }
    setup(port) {
        return __awaiter(this, void 0, void 0, function* () {
            this._server.listen(port, () => {
                (0, logger_1.log)('listening on', { port });
            });
        });
    }
    teardown() {
        return __awaiter(this, void 0, void 0, function* () {
            this._server.close();
        });
    }
    _handleRequest(request, response) {
        const method = request.method;
        const url = request.url;
        (0, logger_1.log)('handling request', { method, url });
        if (method !== 'GET') {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.write('not-okay');
            return;
        }
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('okay');
    }
}
exports.AppServer = AppServer;
