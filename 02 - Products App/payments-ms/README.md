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
PORT=3003

# https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET=

STRIPE_SUCCESS_URL=http://localhost:3003/payments/success
STRIPE_CANCEL_UR=http://localhost:3003/payments/cancel

# https://dashboard.stripe.com/test/webhooks/we_1OrjjpLpSSVtW50ltIQEAP8z
# This is the signing secret of the webhook
STRIPE_ENDPOINT_SECRET=

# NATS_SERVERS="nats://localhost:4222,nats://localhost:4223"
NATS_SERVERS="nats://localhost:4222"
```

### 4. Raise NATS Sever

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

### 5. Raise project

```cmd
npm run start:dev
```
