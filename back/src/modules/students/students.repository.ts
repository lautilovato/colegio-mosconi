import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from "@nestjs/common";
import { Student } from 'src/infrastructure/database/entities/Student';
import { BaseMikroOrmRepository } from "src/shared/base/base.repository";

@Injectable()
export class StudentsRepository extends BaseMikroOrmRepository<Student> {

  constructor(em: EntityManager) {
    super(em, Student);
  }

  async persistAndFlush(entity: Student): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

}