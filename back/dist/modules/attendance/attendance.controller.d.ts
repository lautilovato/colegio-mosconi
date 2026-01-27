import { AttendanceService } from './attendance.service';
import { Attendance } from 'src/infrastructure/database/entities/Attendance';
import { TakeClassAttendanceDto } from './dto/takeClassAttendance.dto';
import { UpdateAttendanceDto } from './dto/updateAttendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    takeClassAttendance(classId: number, dto: TakeClassAttendanceDto): Promise<Attendance[]>;
    getClassAttendanceByDate(classId: number, date: string): Promise<Attendance[]>;
    getStudentAttendanceHistory(studentId: number): Promise<Attendance[]>;
    updateAttendance(id: number, dto: UpdateAttendanceDto): Promise<Attendance>;
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
