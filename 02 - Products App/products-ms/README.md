# Product Microservice

## Getting Started

### 1. Clonar el repositorio

```cmd
git clone https://github.com/randymxd06/Curso_NestJS_Microservicios.git
```

### 2. Instalar dependencias

```cmd
npm install
```

### 3. Crear un archivo `.env` basado en el `env.template`

```.env
PORT=3001

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
```

### 4. Ejecutar migración de prisma

```cmd
npx prisma migrate dev
```

### 5. Levantar proyecto

```cmd
npm run start:dev
```
