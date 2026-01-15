"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const core_1 = require("@mikro-orm/core");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const Student_1 = require("./infrastructure/database/entities/Student");
const students_module_1 = require("./modules/students/students.module");
let AppModule = class AppModule {
    constructor(orm) {
        this.orm = orm;
    }
    async onModuleInit() {
        if (process.env.NODE_ENV !== 'test') {
            await this.orm.getMigrator().up();
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nestjs_1.MikroOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const clientUrl = config.get('DATABASE_URL');
                    const base = {
                        driver: postgresql_1.PostgreSqlDriver,
                        entities: [Student_1.Student],
                        debug: true,
                        allowGlobalContext: true,
                        migrations: {
                            path: (0, path_1.join)(__dirname, './infrastructure/database/migrations'),
                            pathTs: (0, path_1.join)(process.cwd(), 'src/infrastructure/database/migrations'),
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
            students_module_1.StudentsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [core_1.MikroORM])
], AppModule);
//# sourceMappingURL=app.module.js.map