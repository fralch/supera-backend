import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // <-- permite todas las conexiones
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // <-- permite todos los métodos HTTP, incluyendo OPTIONS
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }); // habilitar CORS para todas las rutas
  await app.listen(4000);
}
bootstrap();
