FROM node:lts

# install simple http server for serving static content
# RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /vue-app

# copy both 'package.json' and 'package-lock.json' (if available)

COPY package.json /vue-app/package.json

# # install project dependencies
RUN npm install

# RUN npm install vue 

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /vue-app/

# EXPOSE 80
EXPOSE 80

CMD [ "npm", "run", "dev" ]