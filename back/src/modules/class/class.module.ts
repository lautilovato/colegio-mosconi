import { Global, Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { ClassService } from './class.service';

@Global()
@Module({
  imports: [],
  controllers: [ClassController],
  providers: [
    ClassRepository,
    ClassService,
  ],
  exports: [ClassRepository],
})
export class ClassModule {}
