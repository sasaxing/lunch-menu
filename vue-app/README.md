# lunch-menu

A fun project built in Vue3 + TypeScript to show you what you can cook with the food you have at home.

## Project Setup

```sh
yarn install
```

Compile and Hot-Reload for Development

```sh
yarn dev
```

Type-Check, Compile and Minify for Production

```sh
yarn build
```

Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```


Start MongoDB locally
```sh
yarn start-mongodb
```

Run MongoDB Test Client
```sh
yarn test-mongodb
```

Stop MongoDB
```sh
yarn stop-mongodb
```

Setup the Vue app in Docker container
```sh
# build the image
cd vue-app
docker build -t yxing-vue-app-image-alpine .

# run container and start the vue-app in container
docker run -p 8080:80 --detach --rm --name yxing-vue-app yxing-vue-app-image-alpine
# --rm means remove the container after stop

# stop container
docker stop yxing-vue-app

```