# Product Microservice

## Getting Started

### 1. Clonar el repositorio

```cmd
git clone https://github.com/Nest-Microservices-Course-Randymxd06/products-microservice.git
```

### 2. Instalar dependencias

**npm:**

```cmd
npm install
```

**yarn:**

```cmd
yarn install
```

**pnpm:**

```cmd
pnpm install
```

### 3. Crear un archivo `.env` basado en el `.env.template`

```.env
PORT=3001
DATABASE_URL="file:./dev.db"
```

### 4. Ejecutar migracion de prisma

```cmd
npx prisma migrate dev
```

### 5. Correr el proyecto

```cmd
npm run start:dev
```
