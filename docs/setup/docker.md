# Docker Runtime

## Start

```bash
docker compose up --build
```

## Compose Service

- Service name: `be-client`
- Port mapping: `${PORT:-3001}:3001`
- Env source: `.env`

## Image

Multi-stage build:

1. Build NestJS app in builder stage.
2. Run production dependencies + compiled `dist` in runtime stage.
