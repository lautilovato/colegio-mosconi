import { AttendanceStatus } from 'src/infrastructure/database/entities/Attendance';
export declare class UpdateAttendanceDto {
    status?: AttendanceStatus;
    notes?: string;
    date?: string;
}
