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
    origin: 'http://localhost:5173', // Puerto por defecto de Vite
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('🚀 Servidor ejecutándose en http://localhost:3000');
}
bootstrap();
