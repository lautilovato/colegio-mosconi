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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const transactional_mikro_orm_decorator_1 = require("../../shared/decorators/transactional-mikro-orm.decorator");
const class_repository_1 = require("./class.repository");
const Class_1 = require("../../infrastructure/database/entities/Class");
const Student_1 = require("../../infrastructure/database/entities/Student");
const core_1 = require("@mikro-orm/core");
let ClassService = class ClassService {
    constructor(classRepository, em) {
        this.classRepository = classRepository;
        this.em = em;
    }
    async create(createClassDto) {
        const newClass = new Class_1.Class();
        (0, core_1.wrap)(newClass).assign(createClassDto);
        await this.classRepository.persistAndFlush(newClass);
        return newClass;
    }
    async findOne(id) {
        const classEntity = await this.classRepository.findOne({ id }, { populate: ['students'] });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with id ${id} not found`);
        }
        return classEntity;
    }
    async findAll() {
        return this.classRepository.findAll({ populate: ['students'] });
    }
    async update(id, updateClassDto) {
        const existingClass = await this.classRepository.findOne({ id });
        if (!existingClass) {
            throw new common_1.NotFoundException(`Class with id ${id} not found`);
        }
        (0, core_1.wrap)(existingClass).assign(updateClassDto);
        await this.classRepository.flush();
        return existingClass;
    }
    async delete(id) {
        const existingClass = await this.classRepository.findOne({ id });
        if (!existingClass) {
            throw new common_1.NotFoundException(`Class with id ${id} not found`);
        }
        await this.classRepository.removeAndFlush(existingClass);
    }
    async assignStudents(classId, studentIds) {
        const classEntity = await this.classRepository.findOne({ id: classId });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with id ${classId} not found`);
        }
        const students = await this.em.find(Student_1.Student, { id: { $in: studentIds } });
        if (students.length !== studentIds.length) {
            throw new common_1.BadRequestException('Some students were not found');
        }
        students.forEach(student => { student.class = classEntity; });
        await this.em.flush();
        return this.findOne(classId);
    }
    async removeStudents(classId, studentIds) {
        const classEntity = await this.classRepository.findOne({ id: classId });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with id ${classId} not found`);
        }
        const students = await this.em.find(Student_1.Student, { id: { $in: studentIds }, class: classEntity });
        students.forEach(student => { student.class = undefined; });
        await this.em.flush();
        return this.findOne(classId);
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    (0, transactional_mikro_orm_decorator_1.TransactionalMikroOrmClass)(),
    __metadata("design:paramtypes", [class_repository_1.ClassRepository,
        core_1.EntityManager])
], ClassService);
//# sourceMappingURL=class.service.js.map