"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const appServer = (0, http_1.createServer)((req, res) => {
    // log('receiving request', req)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
});
appServer.listen(3000, () => {
    log('listening on', { port: 3000 });
});
function log(message, arg) {
    console.log('[server]' + message, arg);
}
