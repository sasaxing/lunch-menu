"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_server_1 = require("./app-server/app-server");
const appServer = new app_server_1.AppServer();
appServer.setup(3000);
