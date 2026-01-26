import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from "@nestjs/common";
import { Class } from 'src/infrastructure/database/entities/Class';
import { BaseMikroOrmRepository } from "src/shared/base/base.repository";

@Injectable()
export class ClassRepository extends BaseMikroOrmRepository<Class> {

  constructor(em: EntityManager) {
    super(em, Class);
  }

  async persistAndFlush(entity: Class): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

}