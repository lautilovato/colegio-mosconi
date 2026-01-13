"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("@mikro-orm/postgresql");
const path_1 = require("path");
const migrations_1 = require("@mikro-orm/migrations");
const dotenv = require("dotenv");
dotenv.config({ path: (0, path_1.join)(__dirname, '../../', '.env') });
exports.default = (0, postgresql_1.defineConfig)({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    dbName: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    entities: ['./dist/infrastructure/database/entities'],
    entitiesTs: ['./src/infrastructure/database/entities'],
    extensions: [migrations_1.Migrator],
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
//# sourceMappingURL=database.configs.js.map