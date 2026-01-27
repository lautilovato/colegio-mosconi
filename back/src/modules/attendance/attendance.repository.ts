import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from "@nestjs/common";
import { Attendance } from 'src/infrastructure/database/entities/Attendance';
import { BaseMikroOrmRepository } from "src/shared/base/base.repository";

@Injectable()
export class AttendanceRepository extends BaseMikroOrmRepository<Attendance> {

  constructor(em: EntityManager) {
    super(em, Attendance);
  }

  async persistAndFlush(entity: Attendance): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

}
