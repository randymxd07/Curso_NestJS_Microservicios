# Orders Microservice

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/randymxd06/Curso_NestJS_Microservicios.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a file `.env` based on it `env.template`

```.env
PORT=3002
DATABASE_URL="postgresql://postgres:123456@localhost:5432/ordersdb?schema=public"
NATS_SERVERS="nats://localhost:4222,nats://localhost:4223"
```

### 4. Raise the database with docker compose

```bash
docker compose up -d
```

### 5. Install the prism customer

```bash
npm install @prisma/client
```

### 6. Execute migration to create the database

```bash
npx prisma migrate dev --name init
```

### 7. Raise NATS Sever

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

### 8. Raise project

```bash
npm run start:dev
```
