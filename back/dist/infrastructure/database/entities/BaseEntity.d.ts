import { Opt } from '@mikro-orm/core';
export declare abstract class CustomBaseEntity {
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
}
