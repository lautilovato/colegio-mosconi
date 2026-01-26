import { type Opt, Collection } from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
import { Student } from './Student';
export declare class Class extends CustomBaseEntity {
    id: number & Opt;
    name: string;
    year?: number;
    students: Collection<Student, object>;
}
