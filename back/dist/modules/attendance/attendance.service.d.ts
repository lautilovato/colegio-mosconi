import { AttendanceRepository } from './attendance.repository';
import { TakeClassAttendanceDto } from './dto/takeClassAttendance.dto';
import { UpdateAttendanceDto } from './dto/updateAttendance.dto';
import { Attendance } from 'src/infrastructure/database/entities/Attendance';
import { EntityManager } from '@mikro-orm/core';
export declare class AttendanceService {
    private attendanceRepository;
    private readonly em;
    constructor(attendanceRepository: AttendanceRepository, em: EntityManager);
    takeClassAttendance(classId: number, dto: TakeClassAttendanceDto): Promise<Attendance[]>;
    getClassAttendanceByDate(classId: number, date: string): Promise<Attendance[]>;
    getStudentAttendanceHistory(studentId: number): Promise<Attendance[]>;
    updateAttendance(attendanceId: number, dto: UpdateAttendanceDto): Promise<Attendance>;
    getClassAttendanceReport(classId: number, startDate?: string, endDate?: string): Promise<{
        class: {
            id: number & import("@mikro-orm/core").Opt.Brand;
            name: string;
            year: number;
        };
        period: {
            startDate: string;
            endDate: string;
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
                attendanceRate: string | number;
            };
        }[];
    }>;
}
