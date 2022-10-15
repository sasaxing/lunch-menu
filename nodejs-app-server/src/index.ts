import { AppServer } from "./app-server/app-server";
import { log } from "./utils/logger";

const defaultMongoDbConfig = {
    url: 'mongodb://localhost:27017',
    dbName: 'lunch_menu',
    collectionName: 'food_stock'
};

const appServer = new AppServer(defaultMongoDbConfig);
appServer.setup(3000).then((result) => {
    log('Server started', {result})
}).catch((reason) => {
    log('Error happens during setup!', {reason});
});

process.addListener('uncaughtException', (what) => {
    log('uncaughtException', { what })
});

process.addListener('unhandledRejection', (what) => {
    log('unhandledRejection', { what })
});

// https://nodejs.org/api/process.html#signal-events
process.on('SIGINT', (signal) => {
    log('Process was interrupted by ctrl+c: ', { signal });
    process.exit();
});

process.on('SIGTERM', (signal) => {
    log('Process was terminated, possibly by kill', { signal });
    process.exit();
});

