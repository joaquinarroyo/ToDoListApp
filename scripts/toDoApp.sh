#!/bin/bash

PASSWORD=$1 # The first argument is the password
JAR_NAME="back-0.0.1-SNAPSHOT.jar"
OPTIONS="/home/joaquin/Desktop/Ejercicio/ToDoListApp/back/src/main/resources/application.properties"
OPTIONS2="-c /home/joaquin/Desktop/Ejercicio/ToDoListApp/back/src/main/resources/application.properties"

# Create the database if it not exists
mysql -u root -p$PASSWORD -e "CREATE DATABASE IF NOT EXISTS todoApp"

# Deletes de row that has the root password and inserts the new password
sed -i.bak -e '8d' ${OPTIONS}
echo "spring.datasource.password="${PASSWORD} >> ${OPTIONS}

# Run the application
cd /home/joaquin/Desktop/Ejercicio/ToDoListApp/back
"${JAVA_HOME}/bin/java" ${JAVA_OPTIONS} -jar ${JAR_NAME} ${OPTIONS2} & cd /home/joaquin/Desktop/Ejercicio/ToDoListApp/front && npm start

# Close both ports (8080 and 3000)
sudo kill $(sudo lsof -t -i:8080)
sudo kill $(sudo lsof -t -i:3000)