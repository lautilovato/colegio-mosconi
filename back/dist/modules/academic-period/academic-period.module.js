"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicPeriodModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_1 = require("@mikro-orm/nestjs");
const AcademicPeriod_1 = require("../../infrastructure/database/entities/AcademicPeriod");
const academic_period_controller_1 = require("./academic-period.controller");
const academic_period_service_1 = require("./academic-period.service");
let AcademicPeriodModule = class AcademicPeriodModule {
};
exports.AcademicPeriodModule = AcademicPeriodModule;
exports.AcademicPeriodModule = AcademicPeriodModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_1.MikroOrmModule.forFeature([AcademicPeriod_1.AcademicPeriod])],
        controllers: [academic_period_controller_1.AcademicPeriodController],
        providers: [academic_period_service_1.AcademicPeriodService],
        exports: [academic_period_service_1.AcademicPeriodService],
    })
], AcademicPeriodModule);
//# sourceMappingURL=academic-period.module.js.map