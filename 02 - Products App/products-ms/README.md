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
PORT=3001

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
```

### 4. Execute prisma migration

```cmd
npx prisma migrate dev
```

### 5. Raise project

```cmd
npm run start:dev
```
