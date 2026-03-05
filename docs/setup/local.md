# Local Development

## Environment

```bash
cp .env.example .env
```

Required:

- `AUTH_JWT_PUBLIC_KEY`

Optional:

- `PORT` (default `3001`)
- `CORS_ORIGIN` (default allows all)

## Run

```bash
npm install
npm run start:dev
```

## Checks

```bash
npm run lint
npm run build
npm run test:e2e -- --runInBand
```
