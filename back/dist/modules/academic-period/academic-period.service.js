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
exports.AcademicPeriodService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const AcademicPeriod_1 = require("../../infrastructure/database/entities/AcademicPeriod");
const Class_1 = require("../../infrastructure/database/entities/Class");
const transactional_mikro_orm_decorator_1 = require("../../shared/decorators/transactional-mikro-orm.decorator");
const academic_period_repository_1 = require("./academic-period.repository");
let AcademicPeriodService = class AcademicPeriodService {
    constructor(academicPeriodRepository, em) {
        this.academicPeriodRepository = academicPeriodRepository;
        this.em = em;
    }
    async create(createDto) {
        const classEntity = await this.em.findOne(Class_1.Class, { id: createDto.classId });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with id ${createDto.classId} not found`);
        }
        const overlapping = await this.academicPeriodRepository.findOne({
            class: classEntity,
            $or: [
                {
                    startDate: { $lte: new Date(createDto.endDate) },
                    endDate: { $gte: new Date(createDto.startDate) },
                },
            ],
        });
        if (overlapping) {
            throw new common_1.BadRequestException('Ya existe un período académico que se solapa con estas fechas para esta clase');
        }
        if (createDto.isActive) {
            await this.em.nativeUpdate(AcademicPeriod_1.AcademicPeriod, { class: classEntity, isActive: true }, { isActive: false });
        }
        const academicPeriod = this.em.create(AcademicPeriod_1.AcademicPeriod, {
            name: createDto.name,
            startDate: new Date(createDto.startDate),
            endDate: new Date(createDto.endDate),
            year: createDto.year,
            isActive: createDto.isActive || false,
            class: classEntity,
        });
        await this.em.persistAndFlush(academicPeriod);
        return academicPeriod;
    }
    async findAll(classId, year, isActive) {
        const filter = {};
        if (classId && classId.trim()) {
            const classIdNum = parseInt(classId.trim());
            if (!isNaN(classIdNum)) {
                filter.class = classIdNum;
            }
        }
        if (year && year.trim()) {
            const yearNum = parseInt(year.trim());
            if (!isNaN(yearNum)) {
                filter.year = yearNum;
            }
        }
        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
        }
        return this.academicPeriodRepository.find(filter, {
            populate: ['class'],
            orderBy: { year: 'DESC', startDate: 'DESC' },
        });
    }
    async findByClass(classId) {
        return this.academicPeriodRepository.find({ class: classId }, { orderBy: { year: 'DESC', startDate: 'DESC' } });
    }
    async findActiveByClass(classId) {
        return this.academicPeriodRepository.findOne({
            class: classId,
            isActive: true,
        });
    }
    async findOne(id) {
        const academicPeriod = await this.academicPeriodRepository.findOne({ id }, { populate: ['class'] });
        if (!academicPeriod) {
            throw new common_1.NotFoundException(`Academic period with id ${id} not found`);
        }
        return academicPeriod;
    }
    async update(id, updateDto) {
        const academicPeriod = await this.findOne(id);
        if (updateDto.startDate) {
            academicPeriod.startDate = new Date(updateDto.startDate);
        }
        if (updateDto.endDate) {
            academicPeriod.endDate = new Date(updateDto.endDate);
        }
        if (updateDto.name !== undefined) {
            academicPeriod.name = updateDto.name;
        }
        if (updateDto.year !== undefined) {
            academicPeriod.year = updateDto.year;
        }
        if (updateDto.isActive !== undefined) {
            if (updateDto.isActive) {
                await this.em.nativeUpdate(AcademicPeriod_1.AcademicPeriod, { class: academicPeriod.class, isActive: true, id: { $ne: id } }, { isActive: false });
            }
            academicPeriod.isActive = updateDto.isActive;
        }
        await this.em.flush();
        return academicPeriod;
    }
    async delete(id) {
        const academicPeriod = await this.findOne(id);
        await this.em.removeAndFlush(academicPeriod);
    }
};
exports.AcademicPeriodService = AcademicPeriodService;
exports.AcademicPeriodService = AcademicPeriodService = __decorate([
    (0, common_1.Injectable)(),
    (0, transactional_mikro_orm_decorator_1.TransactionalMikroOrmClass)(),
    __metadata("design:paramtypes", [academic_period_repository_1.AcademicPeriodRepository,
        core_1.EntityManager])
], AcademicPeriodService);
//# sourceMappingURL=academic-period.service.js.map