"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_server_1 = require("./app-server/app-server");
const logger_1 = require("./utils/logger");
const defaultMongoDbConfig = {
    url: 'mongodb://localhost:1314',
    dbName: 'lunch_menu',
    collectionName: 'food_stock'
};
const appServer = new app_server_1.AppServer(defaultMongoDbConfig);
appServer.setup(3000).then((result) => {
}).catch((reason) => {
    (0, logger_1.log)('Error happens during setup!', { reason });
});
