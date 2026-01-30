import { AttendanceService } from './attendance.service';
import { Attendance } from 'src/infrastructure/database/entities/Attendance';
import { TakeClassAttendanceDto } from './dto/takeClassAttendance.dto';
import { UpdateAttendanceDto } from './dto/updateAttendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    takeClassAttendance(dto: TakeClassAttendanceDto): Promise<Attendance[]>;
    getStudentAttendance(studentId: number, academicPeriodId?: string): Promise<Attendance[]>;
    getClassAttendance(classId: number, academicPeriodId?: string, date?: string): Promise<Attendance[]>;
    checkAttendanceExists(classId: number, academicPeriodId: string, date: string): Promise<{
        exists: boolean;
        count: number;
    }>;
    getClassAttendanceReport(classId: number, academicPeriodId?: string): Promise<{
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
    updateAttendance(id: number, dto: UpdateAttendanceDto): Promise<Attendance>;
    deleteAttendance(id: number): Promise<void>;
}
