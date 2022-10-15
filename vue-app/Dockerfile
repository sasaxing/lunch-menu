# node:lts-alpine ~170MB has yarn, but no bash
FROM node:lts-alpine 

# make the 'app' folder the current working directory
WORKDIR /vue-app

COPY package.json /vue-app/package.json
RUN npm install

# # install only necessary project dependencies
# RUN yarn add vue vite mongodb

# # copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /vue-app/

# # EXPOSE 8001
EXPOSE 8001

CMD [ "npm", "run", "dev" ]