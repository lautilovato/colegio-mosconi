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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const transactional_mikro_orm_decorator_1 = require("../../shared/decorators/transactional-mikro-orm.decorator");
const attendance_repository_1 = require("./attendance.repository");
const Student_1 = require("../../infrastructure/database/entities/Student");
const Class_1 = require("../../infrastructure/database/entities/Class");
const core_1 = require("@mikro-orm/core");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository, em) {
        this.attendanceRepository = attendanceRepository;
        this.em = em;
    }
    async takeClassAttendance(classId, dto) {
        const classEntity = await this.em.findOne(Class_1.Class, { id: classId });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with id ${classId} not found`);
        }
        const date = new Date(dto.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date > today) {
            throw new common_1.BadRequestException('No se puede tomar asistencia de fechas futuras');
        }
        const studentIds = dto.attendances.map(a => a.studentId);
        const students = await this.em.find(Student_1.Student, {
            id: { $in: studentIds },
            class: classEntity
        });
        if (students.length !== studentIds.length) {
            throw new common_1.BadRequestException('Algunos estudiantes no pertenecen a esta clase');
        }
        const existingAttendance = await this.attendanceRepository.find({
            class: classEntity,
            date: date
        });
        if (existingAttendance.length > 0) {
            throw new common_1.BadRequestException(`Ya existe asistencia registrada para la fecha ${dto.date}`);
        }
        const attendances = [];
        for (const record of dto.attendances) {
            const student = students.find(s => s.id === record.studentId);
            if (student) {
                const attendance = this.attendanceRepository.create({
                    student: student,
                    class: classEntity,
                    date: date,
                    status: record.status
                });
                attendances.push(attendance);
            }
        }
        await this.em.persistAndFlush(attendances);
        return attendances;
    }
    async getClassAttendanceByDate(classId, date) {
        const classEntity = await this.em.findOne(Class_1.Class, { id: classId });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with id ${classId} not found`);
        }
        return this.attendanceRepository.find({
            class: classEntity,
            date: new Date(date)
        }, { populate: ['student'] });
    }
    async getStudentAttendanceHistory(studentId) {
        const student = await this.em.findOne(Student_1.Student, { id: studentId });
        if (!student) {
            throw new common_1.NotFoundException(`Student with id ${studentId} not found`);
        }
        return this.attendanceRepository.find({ student: student }, {
            populate: ['class'],
            orderBy: { date: 'DESC' }
        });
    }
    async updateAttendance(attendanceId, dto) {
        const attendance = await this.attendanceRepository.findOne({ id: attendanceId });
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance with id ${attendanceId} not found`);
        }
        if (dto.status) {
            attendance.status = dto.status;
        }
        await this.em.flush();
        return attendance;
    }
    async getClassAttendanceReport(classId, startDate, endDate) {
        const classEntity = await this.em.findOne(Class_1.Class, { id: classId }, { populate: ['students'] });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with id ${classId} not found`);
        }
        const filter = { class: classEntity };
        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        const attendances = await this.attendanceRepository.find(filter, {
            populate: ['student']
        });
        const studentStats = classEntity.students.getItems().map(student => {
            const studentAttendances = attendances.filter(a => a.student.id === student.id);
            const total = studentAttendances.length;
            const present = studentAttendances.filter(a => a.status === 'present').length;
            const absent = studentAttendances.filter(a => a.status === 'absent').length;
            const late = studentAttendances.filter(a => a.status === 'late').length;
            const justified = studentAttendances.filter(a => a.status === 'justified').length;
            return {
                student: {
                    id: student.id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    dni: student.dni
                },
                statistics: {
                    total,
                    present,
                    absent,
                    late,
                    justified,
                    attendanceRate: total > 0 ? ((present + late) / total * 100).toFixed(2) : 0
                }
            };
        });
        return {
            class: {
                id: classEntity.id,
                name: classEntity.name,
                year: classEntity.year
            },
            period: {
                startDate: startDate || null,
                endDate: endDate || null
            },
            students: studentStats
        };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    (0, transactional_mikro_orm_decorator_1.TransactionalMikroOrmClass)(),
    __metadata("design:paramtypes", [attendance_repository_1.AttendanceRepository,
        core_1.EntityManager])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map