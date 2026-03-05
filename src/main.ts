import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';
import { validateEnv } from './config/env.validation';
import { RunFileLogger } from './logging/run-file-logger';

async function bootstrap() {
  validateEnv(process.env);

  const logger = new RunFileLogger('SRS-be-client');
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.trim() || true,
    credentials: false,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`,
      );
    });
    next();
  });

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  logger.log(`Service started on port ${port}`);
  logger.log(`Run log file: ${logger.getLogFilePath()}`);
}

void bootstrap();
