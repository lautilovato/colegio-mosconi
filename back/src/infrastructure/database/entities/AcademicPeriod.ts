import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, Opt } from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
import { Class } from './Class';
import { Attendance } from './Attendance';

@Entity()
export class AcademicPeriod extends CustomBaseEntity {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  id!: number & Opt;

  @Property({ fieldName: 'name', nullable: false })
  name!: string;

  @Property({ fieldName: 'start_date', columnType: 'date', nullable: false })
  startDate!: Date;

  @Property({ fieldName: 'end_date', columnType: 'date', nullable: false })
  endDate!: Date;

  @Property({ fieldName: 'year', nullable: false })
  year!: number;

  @Property({ fieldName: 'is_active', type: 'boolean', default: false })
  isActive: boolean = false;

  @ManyToOne(() => Class, { fieldName: 'class_id', nullable: false })
  class!: Class;

  @OneToMany(() => Attendance, (attendance) => attendance.academicPeriod)
  attendances = new Collection<Attendance>(this);
}
