import { type Opt } from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
import { Student } from './Student';
import { Class } from './Class';
export declare class Attendance extends CustomBaseEntity {
    id: number & Opt;
    student: Student;
    class: Class;
    date: Date;
    status: 'present' | 'absent' | 'late' | 'justified';
}
