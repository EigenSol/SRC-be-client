# HTTP API

## `GET /health`

Response `200`:

```json
{
  "status": "ok",
  "service": "be-client"
}
```

## `GET /api/protected/ping`

Requires `Authorization: Bearer <token>`.

Response `200`:

```json
{
  "ok": true,
  "message": "Backend token verification succeeded",
  "user": {
    "userId": "123",
    "email": "qa@srs-assistant.io"
  }
}
```

Failure cases:

- `401` missing/invalid/expired token
