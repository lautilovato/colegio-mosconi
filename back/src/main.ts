import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS para permitir peticiones del frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Puerto por defecto de Vite
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('🚀 Servidor ejecutándose en http://localhost:3000');
}
bootstrap();
