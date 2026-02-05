import { defineConfig } from '@mikro-orm/postgresql';
import { join } from 'path';
import { Migrator } from '@mikro-orm/migrations';
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde la raíz del proyecto
dotenv.config({ path: join(__dirname, '../../', '.env') });

export default defineConfig({
  clientUrl: process.env.DATABASE_URL || undefined,
  host: process.env.DATABASE_URL ? undefined : process.env.DATABASE_HOST,
  port: process.env.DATABASE_URL ? undefined : Number(process.env.DATABASE_PORT),
  dbName: process.env.DATABASE_URL ? undefined : process.env.DATABASE_NAME,
  user: process.env.DATABASE_URL ? undefined : process.env.DATABASE_USER,
  password: process.env.DATABASE_URL ? undefined : process.env.DATABASE_PASSWORD,
  entities: ['./dist/infrastructure/database/entities'],
  entitiesTs: ['./src/infrastructure/database/entities'],
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