# docker build -t fitness-club-spring-boot-api .
# docker run -p 8084:8080 fitness-club-spring-boot-api
FROM eclipse-temurin:17.0.12_7-jre-jammy
COPY ./target/*.jar app.jar
ENTRYPOINT [ "java", "-jar", "/app.jar" ]
