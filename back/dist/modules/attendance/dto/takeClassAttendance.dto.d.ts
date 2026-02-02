import { AttendanceStatus } from 'src/infrastructure/database/entities/Attendance';
export declare class AttendanceRecordDto {
    studentId: number;
    status: AttendanceStatus;
    notes?: string;
}
export declare class TakeClassAttendanceDto {
    classId: number;
    academicPeriodId: number;
    date: string;
    attendances: AttendanceRecordDto[];
}
