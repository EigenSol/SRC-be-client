# Architecture Overview

`SRC-be-client` is a consumer backend that verifies JWTs issued by `SRC-IdP`.

## Responsibilities

- Expose health endpoint.
- Protect backend routes with JWT verification.
- Validate token signatures with IdP public key.

## Non-Responsibilities

- Does not issue tokens.
- Does not hold private signing keys.
- Does not manage user credentials.

## Runtime Model

- Stateless authentication checks.
- Public-key based verification (`RS256`).
- CORS enabled for UI integration testing.
