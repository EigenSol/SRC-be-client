# SRC-be-client

Backend API server for SRS-Assistant client module.

Full docs index: [docs/README.md](./docs/README.md)

## Endpoints

- `GET /health`
- `GET /api/protected/ping` (requires Bearer JWT from IdP)

## Environment

```bash
cp .env.example .env
```

Required:

- `AUTH_JWT_PUBLIC_KEY` (IdP public key, escaped with `\\n`)

Optional:

- `PORT` (default `3001`)
- `CORS_ORIGIN` (default allows all)

## Run

```bash
npm install
npm run start:dev
```

## Docker

```bash
docker compose up --build
```
