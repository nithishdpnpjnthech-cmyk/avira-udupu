@echo off
REM Development startup script with proper JVM heap settings
REM This prevents OutOfMemoryError during heavy operations

echo Starting Avira Udupu Backend with 512MB heap...

REM Set Maven options for JVM heap size and network preferences
 REM Force IPv4 to avoid network unreachable errors with Gmail SMTP
set MAVEN_OPTS=-Xms256m -Xmx512m -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./logs -Djava.net.preferIPv4Stack=true

REM Clean and start the application
.\mvnw.cmd spring-boot:run

pause
