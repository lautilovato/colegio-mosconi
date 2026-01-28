import { Collection, Opt } from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
import { Student } from './Student';
import { Attendance } from './Attendance';
import { AcademicPeriod } from './AcademicPeriod';
export declare class Class extends CustomBaseEntity {
    id: number & Opt;
    name: string;
    year: number;
    section?: string;
    students: Collection<Student, object>;
    academicPeriods: Collection<AcademicPeriod, object>;
    attendances: Collection<Attendance, object>;
}
