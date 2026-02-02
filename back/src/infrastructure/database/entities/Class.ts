import { Entity, PrimaryKey, Property, OneToMany, Collection, Opt } from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
import { Student } from './Student';
import { Attendance } from './Attendance';
import { AcademicPeriod } from './AcademicPeriod';

@Entity()
export class Class extends CustomBaseEntity {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  id!: number & Opt;

  @Property({ fieldName: 'name', nullable: false })
  name!: string;

  @Property({ fieldName: 'year', nullable: false })
  year!: number;

  @Property({ fieldName: 'section', nullable: true })
  section?: string;

  @OneToMany(() => Student, (student) => student.class)
  students = new Collection<Student>(this);

  @OneToMany(() => AcademicPeriod, (period) => period.class)
  academicPeriods = new Collection<AcademicPeriod>(this);

  @OneToMany(() => Attendance, (attendance) => attendance.class)
  attendances = new Collection<Attendance>(this);
}
