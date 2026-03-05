# Module Boundaries

## `AuthModule`

Path: `src/modules/auth`

Owns JWT strategy and guard wiring:

- `JwtStrategy`
- `JwtAuthGuard`

## `ProtectedModule`

Path: `src/modules/protected`

Owns protected API endpoints:

- `GET /api/protected/ping`

Requires `JwtAuthGuard` to authorize requests.

## `HealthModule`

Path: `src/modules/health`

Owns liveness endpoint:

- `GET /health`

## Shared

- Env loading and key normalization: `src/config/env.validation.ts`
- Run logging: `src/logging/run-file-logger.ts`
