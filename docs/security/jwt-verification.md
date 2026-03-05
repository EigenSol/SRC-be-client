# JWT Verification

## Key Source

`SRC-be-client` reads verification key from:

- `AUTH_JWT_PUBLIC_KEY` (required)

Escaped newlines are normalized (`\\n` -> real newline).

## Validation Rules

- Algorithm accepted: `RS256`
- Token source: `Authorization` bearer header
- Expiration is enforced

## Data Mapping

After successful verification, payload fields are mapped into request user:

- `sub` -> `userId`
- `email` -> `email`
