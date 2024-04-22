# Cliente Gateway

Gateway is the point of communication between our clients and our services. He is responsible for receiving the requests, sends it to the corresponding services and returns the client's response.

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
PORT=3000

# PRODUCTS_MICROSERVICE_HOST=localhost
# PRODUCTS_MICROSERVICE_PORT=3001

# ORDERS_MICROSERVICE_HOST=localhost
# ORDERS_MICROSERVICE_PORT=3002

# NATS_SERVERS="nats://localhost:4222,nats://localhost:4223"
NATS_SERVERS="nats://localhost:4222"
```

### 4. Raise NATS Sever

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

### 5. Have the microservices that will be consumed raised

### 6. Raise project

```bash
npm run start:dev
```

### 7. Run the following command

```bash
docker build -f dockerfile.prod -t client-gateway .
```
