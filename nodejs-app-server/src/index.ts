import { AppServer } from "./app-server/app-server";
import { log } from "./utils/logger";

const defaultMongoDbConfig = {
    url: 'mongodb://localhost:27017',
    dbName: 'lunch_menu',
    collectionName: 'food_stock'
};

const appServer = new AppServer(defaultMongoDbConfig);
appServer.setup(3000).then((result) => {
}).catch((reason) => {
    log('Error happens during setup!', {reason});
});