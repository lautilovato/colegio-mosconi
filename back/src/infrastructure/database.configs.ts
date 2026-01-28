import { defineConfig } from '@mikro-orm/postgresql';
import { join } from 'path';
import { Migrator } from '@mikro-orm/migrations';
import * as dotenv from 'dotenv';
import { AcademicPeriod } from './database/entities/AcademicPeriod';

// Cargar variables de entorno desde la raíz del proyecto
dotenv.config({ path: join(__dirname, '../../', '.env') });

export default defineConfig({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['./dist/infrastructure/database/entities', AcademicPeriod],
  entitiesTs: ['./src/infrastructure/database/entities', AcademicPeriod],
  extensions: [Migrator],
  migrations: {
    path: './dist/infrastructure/database/migrations',
    pathTs: './src/infrastructure/database/migrations',
    snapshot: true,
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshotName: '.snapshot',
  },
  debug: process.env.NODE_ENV === 'dev',
  timezone: 'UTC',
});