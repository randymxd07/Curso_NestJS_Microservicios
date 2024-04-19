# Product Microservice

## Getting Started

### 1. Clone the repository

```cmd
git clone https://github.com/randymxd06/Curso_NestJS_Microservicios.git
```

### 2. Install dependencies

```cmd
npm install
```

### 3. Create a file `.env` based on it `env.template`

```.env
PPORT=3001
DATABASE_URL="file:./dev.db"
NATS_SERVERS="nats://localhost:4222,nats://localhost:4223"
```

### 4. Execute prisma migration

```cmd
npx prisma migrate dev
```

### 5. Raise NATS Sever

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

### 6. Raise project

```cmd
npm run start:dev
```
