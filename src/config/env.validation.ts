import { config as loadEnvFile } from 'dotenv';

loadEnvFile({ quiet: true });

export function normalizePemValue(value: string): string {
  return value.replace(/\\n/g, '\n').trim();
}

export function getRequiredEnv(key: 'AUTH_JWT_PUBLIC_KEY'): string {
  const value = process.env[key];

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return normalizePemValue(value);
}

export function validateEnv(env: NodeJS.ProcessEnv): void {
  if (!env.AUTH_JWT_PUBLIC_KEY || !env.AUTH_JWT_PUBLIC_KEY.trim()) {
    throw new Error(
      'Missing required environment variable: AUTH_JWT_PUBLIC_KEY',
    );
  }
}
