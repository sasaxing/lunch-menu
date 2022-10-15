./database/stop-mongodb-container.sh 
kill `lsof -n -i :8001 | grep LISTEN`
kill `lsof -n -i :3000 | grep LISTEN`

# lsof -PiTCP -sTCP:LISTEN