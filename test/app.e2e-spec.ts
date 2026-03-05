import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { generateKeyPairSync } from 'node:crypto';
import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

interface ProtectedPingResponse {
  ok: boolean;
  message: string;
  user: {
    userId: string;
    email: string;
  };
}

describe('Backend Auth Verification (e2e)', () => {
  let app: INestApplication<App>;
  let privateKey: string;

  beforeAll(async () => {
    const keys = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    privateKey = keys.privateKey;
    process.env.AUTH_JWT_PUBLIC_KEY = keys.publicKey;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200).expect({
      status: 'ok',
      service: 'be-client',
    });
  });

  it('/api/protected/ping requires token', () => {
    return request(app.getHttpServer()).get('/api/protected/ping').expect(401);
  });

  it('/api/protected/ping verifies valid token', () => {
    const token = sign(
      {
        sub: '123',
        email: 'qa@srs-assistant.io',
      },
      privateKey,
      {
        algorithm: 'RS256',
        expiresIn: '15m',
      },
    );

    return request(app.getHttpServer())
      .get('/api/protected/ping')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(({ body }: { body: ProtectedPingResponse }) => {
        expect(body.ok).toBe(true);
        expect(body.user.userId).toBe('123');
        expect(body.user.email).toBe('qa@srs-assistant.io');
      });
  });
});
