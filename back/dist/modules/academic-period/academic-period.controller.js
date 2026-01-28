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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicPeriodController = void 0;
const common_1 = require("@nestjs/common");
const academic_period_service_1 = require("./academic-period.service");
const createAcademicPeriod_dto_1 = require("./dto/createAcademicPeriod.dto");
const updateAcademicPeriod_dto_1 = require("./dto/updateAcademicPeriod.dto");
let AcademicPeriodController = class AcademicPeriodController {
    constructor(academicPeriodService) {
        this.academicPeriodService = academicPeriodService;
    }
    async getAllPeriods(classId, year, isActive) {
        return this.academicPeriodService.findAll(classId, year, isActive);
    }
    async getPeriodsByClass(classId) {
        return this.academicPeriodService.findByClass(classId);
    }
    async getActivePeriodByClass(classId) {
        return this.academicPeriodService.findActiveByClass(classId);
    }
    async getPeriodById(id) {
        return this.academicPeriodService.findOne(id);
    }
    async createPeriod(createDto) {
        return this.academicPeriodService.create(createDto);
    }
    async updatePeriod(id, updateDto) {
        return this.academicPeriodService.update(id, updateDto);
    }
    async deletePeriod(id) {
        return this.academicPeriodService.delete(id);
    }
};
exports.AcademicPeriodController = AcademicPeriodController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('classId')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AcademicPeriodController.prototype, "getAllPeriods", null);
__decorate([
    (0, common_1.Get)('class/:classId'),
    __param(0, (0, common_1.Param)('classId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AcademicPeriodController.prototype, "getPeriodsByClass", null);
__decorate([
    (0, common_1.Get)('class/:classId/active'),
    __param(0, (0, common_1.Param)('classId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AcademicPeriodController.prototype, "getActivePeriodByClass", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AcademicPeriodController.prototype, "getPeriodById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAcademicPeriod_dto_1.CreateAcademicPeriodDto]),
    __metadata("design:returntype", Promise)
], AcademicPeriodController.prototype, "createPeriod", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateAcademicPeriod_dto_1.UpdateAcademicPeriodDto]),
    __metadata("design:returntype", Promise)
], AcademicPeriodController.prototype, "updatePeriod", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AcademicPeriodController.prototype, "deletePeriod", null);
exports.AcademicPeriodController = AcademicPeriodController = __decorate([
    (0, common_1.Controller)('academic-periods'),
    __metadata("design:paramtypes", [academic_period_service_1.AcademicPeriodService])
], AcademicPeriodController);
//# sourceMappingURL=academic-period.controller.js.map