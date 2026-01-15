import {
    BaseEntity,
    Entity,
    OneToOne,
    OneToMany,
    ManyToOne,
    Collection,
    type Opt,
    PrimaryKey,
    Property,
    Cascade,
} from '@mikro-orm/core';

import { CustomBaseEntity } from './BaseEntity';
import { Class } from './Class';

@Entity()
export class Student extends CustomBaseEntity {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  id!: number & Opt;

  @Property({ fieldName: 'first_name', nullable: true })
  firstName?: string;

  @Property({ fieldName: 'last_name', nullable: true })
  lastName?: string;

  @Property({ fieldName: 'dni', nullable: true })
  dni?: string;

  @ManyToOne(() => Class, { fieldName: 'class_id', nullable: true })
  class?: Class;
}