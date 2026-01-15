import { EntityManager, EntityName, EntityRepository } from '@mikro-orm/postgresql';
export declare class BaseMikroOrmRepository<T extends object> extends EntityRepository<T> {
    readonly em: EntityManager;
    constructor(em: EntityManager, entityClass: EntityName<T>);
    save(entity: T): Promise<void>;
    removeAndFlush(entity: T): Promise<void>;
    flush(): Promise<void>;
    persist(entity: T): Promise<void>;
    remove(entity: T): Promise<void>;
}
