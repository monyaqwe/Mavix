FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY backend/pom.xml ./backend/
COPY backend/auth-service/pom.xml ./backend/auth-service/
COPY backend/auth-service/src ./backend/auth-service/src
WORKDIR /app/backend/auth-service
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/backend/auth-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
