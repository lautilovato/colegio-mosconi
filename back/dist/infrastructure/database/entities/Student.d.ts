import { type Opt } from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
export declare class Student extends CustomBaseEntity {
    id: number & Opt;
    firstName?: string;
    lastName?: string;
    dni?: string;
}
