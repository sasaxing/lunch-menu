docker run --detach --rm \
    --publish 1314:27017 \
    --name yxing-mongodb \
    -v ~/github/0-my-repos/vue/lunch-menu/database/mongoDB-local-volume:/data/db \
    mongo:latest