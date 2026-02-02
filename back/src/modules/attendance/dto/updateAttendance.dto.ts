import { IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { AttendanceStatus } from 'src/infrastructure/database/entities/Attendance';

export class UpdateAttendanceDto {
  @IsOptional()
  @IsEnum(AttendanceStatus)
  status?: AttendanceStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
