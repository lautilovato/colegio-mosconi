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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const transactional_mikro_orm_decorator_1 = require("../../shared/decorators/transactional-mikro-orm.decorator");
const students_repository_1 = require("./students.repository");
const core_1 = require("@mikro-orm/core");
let StudentsService = class StudentsService {
    constructor(studentsRepository) {
        this.studentsRepository = studentsRepository;
    }
    async findOne(id) {
        return this.studentsRepository.findOne(id);
    }
    async create(newStudent) {
        const student = this.studentsRepository.create(newStudent);
        await this.studentsRepository.persistAndFlush(student);
        return student;
    }
    async update(studentId, updatedStudent) {
        const student = await this.studentsRepository.findOne(studentId);
        if (!student) {
            throw new common_1.NotFoundException('Estudiante no encontrada');
        }
        (0, core_1.wrap)(student).assign(updatedStudent, { ignoreUndefined: true });
        await this.studentsRepository.save(student);
        return student;
    }
    async delete(studentId) {
        const student = await this.studentsRepository.findOne(studentId);
        if (!student) {
            throw new common_1.NotFoundException('Estudiante no encontrada');
        }
        await this.studentsRepository.removeAndFlush(student);
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    (0, transactional_mikro_orm_decorator_1.TransactionalMikroOrmClass)(),
    __metadata("design:paramtypes", [students_repository_1.StudentsRepository])
], StudentsService);
//# sourceMappingURL=students.service.js.map