#!/bin/bash

JAR_NAME="back-0.0.1-SNAPSHOT.jar"
OPTIONS=" -c /home/joaquin/Desktop/Ejercicio/ToDoListApp/back/src/main/resources/application.properties"
cd /home/joaquin/Desktop/Ejercicio/ToDoListApp/back
"${JAVA_HOME}/bin/java" ${JAVA_OPTIONS} -jar $JAR_NAME $OPTIONS & cd /home/joaquin/Desktop/Ejercicio/ToDoListApp/front && npm start