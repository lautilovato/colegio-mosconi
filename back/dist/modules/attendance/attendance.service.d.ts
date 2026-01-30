import { EntityManager } from '@mikro-orm/core';
import { Attendance } from 'src/infrastructure/database/entities/Attendance';
import { TakeClassAttendanceDto } from './dto/takeClassAttendance.dto';
import { UpdateAttendanceDto } from './dto/updateAttendance.dto';
import { AttendanceRepository } from './attendance.repository';
export declare class AttendanceService {
    private readonly attendanceRepository;
    private readonly em;
    constructor(attendanceRepository: AttendanceRepository, em: EntityManager);
    takeClassAttendance(dto: TakeClassAttendanceDto): Promise<Attendance[]>;
    getStudentAttendance(studentId: number, academicPeriodId?: number): Promise<Attendance[]>;
    getClassAttendance(classId: number, academicPeriodId?: number, date?: string): Promise<Attendance[]>;
    updateAttendance(id: number, dto: UpdateAttendanceDto): Promise<Attendance>;
    deleteAttendance(id: number): Promise<void>;
    checkAttendanceExists(classId: number, academicPeriodId: number, date: string): Promise<{
        exists: boolean;
        count: number;
    }>;
    getClassAttendanceReport(classId: number, academicPeriodId?: number): Promise<{
        class: {
            id: number & import("@mikro-orm/core").Opt.Brand;
            name: string;
            year: number;
        };
        classStatistics: {
            total: number;
            present: number;
            absent: number;
            late: number;
            justified: number;
            attendanceRate: string;
        };
        students: {
            student: {
                id: number & import("@mikro-orm/core").Opt.Brand;
                firstName: string;
                lastName: string;
                dni: string;
            };
            statistics: {
                total: number;
                present: number;
                absent: number;
                late: number;
                justified: number;
                attendanceRate: string;
            };
        }[];
    }>;
}
