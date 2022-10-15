# lunch-menu


- [lunch-menu](#lunch-menu)
  - [Requirements](#requirements)
  - [Architecture Overview](#architecture-overview)
  - [Vue-app Setup](#vue-app-setup)
    - [start vuew-app Locally](#start-vuew-app-locally)
    - [Setup the Vue app in Docker container](#setup-the-vue-app-in-docker-container)
  - [Setup MongoDB locally](#setup-mongodb-locally)
  - [Lessons](#lessons)

A fun project built in Vue3 + TypeScript to show you what you can cook with the food you have at home.

## Requirements

- Show all food I have at home  
    - with amount, name, expireDate
- Highlight the food that soon will be expired
- Recommand lunch/dinner menu based on the available food.
- ...

## Architecture Overview
TBD

## Vue-app Setup

### start vuew-app Locally

```sh
cd vue-app

# install all dependencies
yarn install

# Compile and Hot-Reload for Development
yarn dev

# Type-Check, Compile and Minify for Production
yarn build

# Run Unit Tests with [Vitest](https://vitest.dev/)
yarn test:unit

# Lint with [ESLint](https://eslint.org/)
yarn lint
```

### Setup the Vue app in Docker container
```sh
# build the image
cd vue-app
docker build -t linsa-vue-app-image-alpine .

# push the image to dockerhub
docker tag linsa-vue-app-image-alpine:latest <docker_user_name>/lunch-menu-vue:latest
docker push <docker_user_name>/lunch-menu-vue:latest

# run container and start the vue-app in container
docker run -p 8080:8001 --detach --rm --name linsa-vue-app linsa-vue-app-image-alpine
# --rm means remove the container after stop

# stop container
docker stop linsa-vue-app

```

## Setup MongoDB locally
```sh
 # start-mongodb
 bash ./database/start-mongodb-container.sh
 
 # stop-mongodb
 bash ./database/stop-mongodb-container.sh
 
 # test-mongodb
 node ./database/test-client.mjs
```


## Lessons

- No direct MongoDB access from Vue, better to add a NodeJS layer in the middle.
    - [Should not try to import MongoDBClient in Vue(browser) - stackoverflow](https://stackoverflow.com/questions/44577052/how-to-import-mongo-db-in-vue-js-2)
    - [How should the architect look like?](https://www.bezkoder.com/vue-node-express-mongodb-mevn-crud/)
- Server needs to specify proper access control to certain resources.
  - by writing to the response header e.g., the following to only allow all requests from a different origin - localhost:8001 to access the target resources:
    ```TypeScript
    response.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:8001" 
      "Access-Control-Allow-Methods": "*" 
    });
    ```
  - [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
    > For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the same-origin policy. This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.