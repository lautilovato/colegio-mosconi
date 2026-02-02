import { Module, OnModuleInit} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './infrastructure/database/entities/Student';
import { Class } from './infrastructure/database/entities/Class';
import { Attendance } from './infrastructure/database/entities/Attendance';
import { StudentsModule } from './modules/students/students.module';
import { ClassModule } from './modules/class/class.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { AcademicPeriodModule } from './modules/academic-period/academic-period.module';

@Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      MikroOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const clientUrl = config.get<string>('DATABASE_URL');
          const base = {
            driver: PostgreSqlDriver,
            entities: [Student, Class, Attendance],
            debug: true,
            allowGlobalContext: true,
            migrations: {
              path: join(__dirname, './infrastructure/database/migrations'),
              pathTs: join(process.cwd(), 'src/infrastructure/database/migrations'),
            },
          };
  
          if (clientUrl) {
            return { ...base, clientUrl };
          }
  
          return {
            ...base,
            host: config.get('DB_HOST', 'localhost'),
            port: parseInt(config.get('DB_PORT', '5432'), 10),
            user: config.get('DB_USERNAME', 'postgres'),
            password: config.get('DB_PASSWORD', 'root'),
            dbName: config.get('DB_NAME', 'colegio_mosconi'), 
          };
        },
      }),
      StudentsModule,
      ClassModule,
      AttendanceModule,
      AcademicPeriodModule,
    ],
    controllers: [AppController],
    providers: [AppService],
  })

  export class AppModule implements OnModuleInit {
    constructor(private readonly orm: MikroORM) {}
  
    async onModuleInit() {
      if (process.env.NODE_ENV !== 'test') {
        await this.orm.getMigrator().up();
      }
    }
  }