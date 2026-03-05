import { LoggerService } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

function getRunLogPath(rootDir: string): string {
  const now = new Date();
  const dateDir = `${pad(now.getDate())}-${MONTHS[now.getMonth()]}-${now.getFullYear()}`;
  const hourDir = `${pad(now.getHours())}-00`;
  const fileName = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.log`;

  return path.join(rootDir, 'logs', dateDir, hourDir, fileName);
}

export class RunFileLogger implements LoggerService {
  private readonly logFilePath: string;

  constructor(
    private readonly serviceName: string,
    rootDir: string = process.cwd(),
  ) {
    this.logFilePath = getRunLogPath(rootDir);
    fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });
  }

  log(message: string): void {
    this.write('INFO', message);
  }

  error(message: string, trace?: string): void {
    this.write('ERROR', message, trace);
  }

  warn(message: string): void {
    this.write('WARN', message);
  }

  debug(message: string): void {
    this.write('DEBUG', message);
  }

  verbose(message: string): void {
    this.write('VERBOSE', message);
  }

  getLogFilePath(): string {
    return this.logFilePath;
  }

  private write(level: string, message: string, trace?: string): void {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [${this.serviceName}] [${level}] ${message}`;
    const line = trace ? `${entry}\n${trace}\n` : `${entry}\n`;

    fs.appendFileSync(this.logFilePath, line, 'utf8');

    if (level === 'ERROR') {
      console.error(entry);
      if (trace) {
        console.error(trace);
      }
      return;
    }

    if (level === 'WARN') {
      console.warn(entry);
      return;
    }

    console.log(entry);
  }
}
