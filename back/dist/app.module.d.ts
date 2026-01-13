import { OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
export declare class AppModule implements OnModuleInit {
    private readonly orm;
    constructor(orm: MikroORM);
    onModuleInit(): Promise<void>;
}
