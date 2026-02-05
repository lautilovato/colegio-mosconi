import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true, // Transforma los objetos a instancias de DTO
    }),
  );
  
  // Configurar CORS para permitir peticiones del frontend
  app.enableCors({
    origin: true, // Permite cualquier origen en producción
    credentials: true,
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
}
bootstrap();
