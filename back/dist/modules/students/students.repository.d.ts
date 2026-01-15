import { EntityManager } from '@mikro-orm/postgresql';
import { Student } from 'src/infrastructure/database/entities/Student';
import { BaseMikroOrmRepository } from "src/shared/base/base.repository";
export declare class StudentsRepository extends BaseMikroOrmRepository<Student> {
    constructor(em: EntityManager);
    persistAndFlush(entity: Student): Promise<void>;
}
