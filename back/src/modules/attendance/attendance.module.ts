import { Global, Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceRepository } from './attendance.repository';
import { AttendanceService } from './attendance.service';

@Global()
@Module({
  imports: [],
  controllers: [AttendanceController],
  providers: [
    AttendanceRepository,
    AttendanceService,
  ],
  exports: [AttendanceRepository],
})
export class AttendanceModule {}
