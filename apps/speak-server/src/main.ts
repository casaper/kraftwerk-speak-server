/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { AppModule } from './app/app.module';

const pidFilePath = resolve('/tmp/speak-server.pid');


const killIfOpen = async () => {
  if (!existsSync(pidFilePath)) {
    return;
  }
  const pidBuffer = await readFile(pidFilePath);
  const pid = parseInt(pidBuffer.toString(), 10);
  console.log(`Killing existing process ${pid}`);
  try {
    process.kill(pid);
  } catch (error) {
    console.log(error);
  }
}

async function bootstrap() {
  await killIfOpen();
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  await writeFile(pidFilePath, String(process.pid));
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix} with PID ${process.pid}`
  );
}

bootstrap();
