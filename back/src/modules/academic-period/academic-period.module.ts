import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AcademicPeriod } from 'src/infrastructure/database/entities/AcademicPeriod';
import { AcademicPeriodController } from './academic-period.controller';
import { AcademicPeriodService } from './academic-period.service';

@Module({
  imports: [MikroOrmModule.forFeature([AcademicPeriod])],
  controllers: [AcademicPeriodController],
  providers: [AcademicPeriodService],
  exports: [AcademicPeriodService],
})
export class AcademicPeriodModule {}
