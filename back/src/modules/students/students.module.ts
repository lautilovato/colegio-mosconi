import { Global, Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsRepository } from './students.repository';
import { StudentsService } from './students.service';

@Global()
@Module({
  imports: [],
  controllers: [StudentsController],
  providers: [
    StudentsRepository,
    StudentsService,
  ],
  exports: [StudentsRepository],
})
export class StudentsModule {}