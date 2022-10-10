docker run --detach --rm \
    --publish 27017:27017 \
    --name linsa-mongodb \
    -v ~/github/0-my-repos/vue/lunch-menu/database/mongoDB-local-volume:/data/db \
    mongo:latest