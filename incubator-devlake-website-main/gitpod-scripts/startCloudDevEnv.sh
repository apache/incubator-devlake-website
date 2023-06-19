#!/bin/sh

 PORT=3000
 counter=0
 watchdog=5

 check_and_set_port() {
     if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null && [ "$counter" -lt $watchdog ]; then
         echo "port $PORT already occupied, changing to the next consecutive port"
         PORT=$(PORT+1)
         counter=$((counter+1))
         check_and_set_next_port
     elif [ "$counter" -ge $watchdog ]; then
         echo "\033[31mUnable to allocate an empty port for NextJS, the last tried port was $NEXTJS_PORT\e[0m"
         echo "Please either change the $PORT to an other random number/unused port number"
         echo "After changes re-run the script"
         exit 1
     else
         printf "🚀 An empty port found for DevLake Docs 🚀 \n"
     fi
 }

 check_and_set_port

 export PORT=$PORT

 yarn start 
