import { EntityManager } from '@mikro-orm/postgresql';
import { Attendance } from 'src/infrastructure/database/entities/Attendance';
import { BaseMikroOrmRepository } from "src/shared/base/base.repository";
export declare class AttendanceRepository extends BaseMikroOrmRepository<Attendance> {
    constructor(em: EntityManager);
    persistAndFlush(entity: Attendance): Promise<void>;
}
