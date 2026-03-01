FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY backend/pom.xml ./backend/
COPY backend/user-service/pom.xml ./backend/user-service/
COPY backend/user-service/src ./backend/user-service/src
WORKDIR /app/backend/user-service
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/backend/user-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
