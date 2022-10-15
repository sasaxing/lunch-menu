# start db
./database/start-mongodb-container.sh

# start node
cd nodejs-app-server
yarn start&
cd -

# start vue
cd vue-app
yarn dev&
cd -