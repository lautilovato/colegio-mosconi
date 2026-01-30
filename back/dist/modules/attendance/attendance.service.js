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
const core_1 = require("@mikro-orm/core");
const Attendance_1 = require("../../infrastructure/database/entities/Attendance");
const Student_1 = require("../../infrastructure/database/entities/Student");
const Class_1 = require("../../infrastructure/database/entities/Class");
const AcademicPeriod_1 = require("../../infrastructure/database/entities/AcademicPeriod");
const transactional_mikro_orm_decorator_1 = require("../../shared/decorators/transactional-mikro-orm.decorator");
const attendance_repository_1 = require("./attendance.repository");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository, em) {
        this.attendanceRepository = attendanceRepository;
        this.em = em;
    }
    async takeClassAttendance(dto) {
        const classEntity = await this.em.findOne(Class_1.Class, { id: dto.classId });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with id ${dto.classId} not found`);
        }
        const academicPeriod = await this.em.findOne(AcademicPeriod_1.AcademicPeriod, { id: dto.academicPeriodId });
        if (!academicPeriod) {
            throw new common_1.NotFoundException(`Academic period with id ${dto.academicPeriodId} not found`);
        }
        if (academicPeriod.class.id !== classEntity.id) {
            throw new common_1.BadRequestException('El período académico no pertenece a esta clase');
        }
        const attendanceDate = new Date(dto.date);
        const existingAttendances = await this.attendanceRepository.find({
            class: classEntity,
            academicPeriod: academicPeriod,
            date: attendanceDate,
        });
        if (existingAttendances.length > 0) {
            existingAttendances.forEach(attendance => this.em.remove(attendance));
            await this.em.flush();
        }
        const attendances = [];
        for (const record of dto.attendances) {
            const student = await this.em.findOne(Student_1.Student, { id: record.studentId });
            if (!student) {
                throw new common_1.NotFoundException(`Student with id ${record.studentId} not found`);
            }
            const attendance = this.em.create(Attendance_1.Attendance, {
                student: student,
                class: classEntity,
                academicPeriod: academicPeriod,
                date: attendanceDate,
                status: record.status,
                notes: record.notes,
            });
            attendances.push(attendance);
        }
        await this.em.persistAndFlush(attendances);
        return attendances;
    }
    async getStudentAttendance(studentId, academicPeriodId) {
        const filter = { student: studentId };
        if (academicPeriodId) {
            filter.academicPeriod = academicPeriodId;
        }
        return this.attendanceRepository.find(filter, {
            populate: ['class', 'academicPeriod'],
            orderBy: { date: 'DESC' },
        });
    }
    async getClassAttendance(classId, academicPeriodId, date) {
        const filter = { class: classId };
        if (academicPeriodId) {
            filter.academicPeriod = academicPeriodId;
        }
        if (date) {
            filter.date = new Date(date);
        }
        return this.attendanceRepository.find(filter, {
            populate: ['student', 'academicPeriod'],
            orderBy: { date: 'DESC' },
        });
    }
    async updateAttendance(id, dto) {
        const attendance = await this.attendanceRepository.findOne({ id });
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance with id ${id} not found`);
        }
        if (dto.status) {
            attendance.status = dto.status;
        }
        if (dto.notes !== undefined) {
            attendance.notes = dto.notes;
        }
        if (dto.date) {
            attendance.date = new Date(dto.date);
        }
        await this.attendanceRepository.flush();
        return attendance;
    }
    async deleteAttendance(id) {
        const attendance = await this.attendanceRepository.findOne({ id });
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance with id ${id} not found`);
        }
        await this.attendanceRepository.removeAndFlush(attendance);
    }
    async checkAttendanceExists(classId, academicPeriodId, date) {
        const attendanceDate = new Date(date);
        const existingAttendances = await this.attendanceRepository.find({
            class: classId,
            academicPeriod: academicPeriodId,
            date: attendanceDate,
        });
        return {
            exists: existingAttendances.length > 0,
            count: existingAttendances.length,
        };
    }
    async getClassAttendanceReport(classId, academicPeriodId) {
        const classEntity = await this.em.findOne(Class_1.Class, { id: classId }, { populate: ['students'] });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with id ${classId} not found`);
        }
        const filter = { class: classEntity };
        if (academicPeriodId) {
            filter.academicPeriod = academicPeriodId;
        }
        const attendances = await this.attendanceRepository.find(filter, {
            populate: ['student'],
        });
        const studentStats = classEntity.students.getItems().map((student) => {
            const studentAttendances = attendances.filter((a) => a.student.id === student.id);
            const total = studentAttendances.length;
            const present = studentAttendances.filter((a) => a.status === Attendance_1.AttendanceStatus.PRESENT).length;
            const absent = studentAttendances.filter((a) => a.status === Attendance_1.AttendanceStatus.ABSENT).length;
            const late = studentAttendances.filter((a) => a.status === Attendance_1.AttendanceStatus.LATE).length;
            const justified = studentAttendances.filter((a) => a.status === Attendance_1.AttendanceStatus.JUSTIFIED).length;
            const attendanceRate = total > 0 ? ((present + late) / total) * 100 : 0;
            return {
                student: {
                    id: student.id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    dni: student.dni,
                },
                statistics: {
                    total,
                    present,
                    absent,
                    late,
                    justified,
                    attendanceRate: attendanceRate.toFixed(2),
                },
            };
        });
        const totalAttendances = attendances.length;
        const totalPresent = attendances.filter((a) => a.status === Attendance_1.AttendanceStatus.PRESENT).length;
        const totalAbsent = attendances.filter((a) => a.status === Attendance_1.AttendanceStatus.ABSENT).length;
        const totalLate = attendances.filter((a) => a.status === Attendance_1.AttendanceStatus.LATE).length;
        const totalJustified = attendances.filter((a) => a.status === Attendance_1.AttendanceStatus.JUSTIFIED).length;
        const classAttendanceRate = totalAttendances > 0 ? ((totalPresent + totalLate) / totalAttendances) * 100 : 0;
        return {
            class: {
                id: classEntity.id,
                name: classEntity.name,
                year: classEntity.year,
            },
            classStatistics: {
                total: totalAttendances,
                present: totalPresent,
                absent: totalAbsent,
                late: totalLate,
                justified: totalJustified,
                attendanceRate: classAttendanceRate.toFixed(2),
            },
            students: studentStats,
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