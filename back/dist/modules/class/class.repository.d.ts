import { EntityManager } from '@mikro-orm/postgresql';
import { Class } from 'src/infrastructure/database/entities/Class';
import { BaseMikroOrmRepository } from "src/shared/base/base.repository";
export declare class ClassRepository extends BaseMikroOrmRepository<Class> {
    constructor(em: EntityManager);
    persistAndFlush(entity: Class): Promise<void>;
}
