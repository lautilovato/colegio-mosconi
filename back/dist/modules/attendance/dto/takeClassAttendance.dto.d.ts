export declare class AttendanceRecordDto {
    studentId: number;
    status: 'present' | 'absent' | 'late' | 'justified';
}
export declare class TakeClassAttendanceDto {
    date: string;
    attendances: AttendanceRecordDto[];
}
