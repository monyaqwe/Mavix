# Mavix Project Run Guide

This guide provides instructions on how to set up and run the Mavix project.

## Prerequisites
- **Docker & Docker Compose**: For running PostgreSQL and Kafka.
- **Java 21 JDK**: For running the backend services.
- **Node.js (v18+)**: For running the frontend.
- **Maven**: (Optional) For building the backend manually.

---

## 1. Fast Track (Docker Compose)
The easiest way to run the entire stack is using Docker Compose. This will start the databases, Kafka, and both backend services.

```powershell
# In the project root directory
docker-compose up --build
```
> [!NOTE]
> This command builds the Docker images for `auth-service` and `user-service` and starts all containers.

---

## 2. Infrastructure Setup (Databases & Kafka)
If you prefer to run the backend services locally (for debugging), you still need the infrastructure containers.

```powershell
# Start only the databases and Kafka
docker-compose up -d auth-db user-db zookeeper kafka
```

---

## 3. Running Backend Services Locally
Once the infrastructure is up, you can start the Spring Boot services.

### Auth Service (Port 8080)
```powershell
cd backend/auth-service
./mvnw spring-boot:run
```

### User Service (Port 8081)
```powershell
cd backend/user-service
./mvnw spring-boot:run
```

---

## 4. Running Frontend (Port 5173)
The frontend is built with React and Vite.

```powershell
cd frontend
npm install
npm run dev
```

---

## Service Endpoints
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Auth API**: [http://localhost:8080](http://localhost:8080)
- **User API**: [http://localhost:8081](http://localhost:8081)
- **Auth DB (Postgres)**: `localhost:5432` (DB: `auth_db`)
- **User DB (Postgres)**: `localhost:5433` (DB: `user_db`)

> [!IMPORTANT]
> When running services locally (via `./mvnw`), they are configured to connect to `localhost`.
> - `auth-service` connects to `localhost:5432`.
> - `user-service` connects to `localhost:5433`.
