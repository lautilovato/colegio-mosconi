import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // Configurar CORS para permitir peticiones del frontend
  const allowedOrigins = [
    'http://localhost:5173', // Dev
    'http://localhost:4173', // Preview
    process.env.FRONTEND_URL, // Vercel URL
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir peticiones sin origin (como Postman o SSR)
      if (!origin) return callback(null, true);
      
      // En desarrollo, permitir cualquier localhost
      if (origin.includes('localhost')) return callback(null, true);
      
      // En producción, permitir Vercel
      if (origin.includes('vercel.app')) return callback(null, true);
      
      // Verificar si está en la lista permitida
      if (allowedOrigins.includes(origin)) return callback(null, true);
      
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
  console.log(`🌍 CORS habilitado para: ${allowedOrigins.join(', ')}`);
}
bootstrap();
