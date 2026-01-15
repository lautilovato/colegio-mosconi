import {
  Entity,
  type Opt,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';

import { CustomBaseEntity } from './BaseEntity';
import { Student } from './Student';

@Entity()
export class Class extends CustomBaseEntity {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  id!: number & Opt;

  @Property({ fieldName: 'name', nullable: false })
  name!: string;

  @Property({ fieldName: 'year', nullable: true })
  year?: number;

  @OneToMany(() => Student, (student) => student.class)
  students = new Collection<Student>(this);
}
