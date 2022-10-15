kill `lsof -n -i :80 | grep LISTEN`
kill `lsof -n -i :3000 | grep LISTEN`
./database/stop-mongodb-container.sh 

# lsof -PiTCP -sTCP:LISTEN