import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

//Para producción
// const crPath = '/opt/nodejscert/server.cert';
// const pkPath = '/opt/nodejscert/server.key';

//Para pruebdas locales
const crPath = 'server.cert';
const pkPath = 'server.key';

let httpsOptions: any = {};

async function bootstrap() {
  if (fs.existsSync(crPath) && fs.existsSync(pkPath)) {
    httpsOptions = {
      cert: fs.readFileSync(crPath),
      key: fs.readFileSync(pkPath)
    }
  }
  const app = await NestFactory.create(AppModule, { httpsOptions });
  initSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.enableCors();
  await app.listen(3038);
  console.log(`La aplicación esta corriendo en: ${await app.getUrl()}`);
}
bootstrap();

