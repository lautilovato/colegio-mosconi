import { Collection, Opt } from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
import { Class } from './Class';
import { Attendance } from './Attendance';
export declare class AcademicPeriod extends CustomBaseEntity {
    id: number & Opt;
    name: string;
    startDate: Date;
    endDate: Date;
    year: number;
    isActive: boolean;
    class: Class;
    attendances: Collection<Attendance, object>;
}
