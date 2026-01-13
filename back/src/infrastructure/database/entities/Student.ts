import {
    BaseEntity,
    Entity,
    OneToOne,
    OneToMany,
    Collection,
    type Opt,
    PrimaryKey,
    Property,
    Cascade,
} from '@mikro-orm/core';

import { CustomBaseEntity } from './BaseEntity';

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

} 