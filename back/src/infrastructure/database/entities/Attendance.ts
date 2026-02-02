import {
  Entity,
  type Opt,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';

import { CustomBaseEntity } from './BaseEntity';
import { Student } from './Student';
import { Class } from './Class';
import { AcademicPeriod } from './AcademicPeriod';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  JUSTIFIED = 'justified',
}

@Entity()
@Unique({ properties: ['student', 'class', 'date'] })
export class Attendance extends CustomBaseEntity {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  id!: number & Opt;

  @ManyToOne(() => Student, { fieldName: 'student_id', nullable: false })
  student!: Student;

  @ManyToOne(() => Class, { fieldName: 'class_id', nullable: false })
  class!: Class;

  @ManyToOne(() => AcademicPeriod, { fieldName: 'academic_period_id', nullable: false })
  academicPeriod!: AcademicPeriod;

  @Property({ fieldName: 'date', columnType: 'date', nullable: false })
  date!: Date;

  @Property({ fieldName: 'status', nullable: false })
  status!: AttendanceStatus;

  @Property({ fieldName: 'notes', nullable: true })
  notes?: string;
}
