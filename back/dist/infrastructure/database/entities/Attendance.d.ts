import { type Opt } from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
import { Student } from './Student';
import { Class } from './Class';
import { AcademicPeriod } from './AcademicPeriod';
export declare enum AttendanceStatus {
    PRESENT = "present",
    ABSENT = "absent",
    LATE = "late",
    JUSTIFIED = "justified"
}
export declare class Attendance extends CustomBaseEntity {
    id: number & Opt;
    student: Student;
    class: Class;
    academicPeriod: AcademicPeriod;
    date: Date;
    status: AttendanceStatus;
    notes?: string;
}
