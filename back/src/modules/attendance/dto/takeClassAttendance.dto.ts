import { IsNotEmpty, IsNumber, IsString, IsDateString, IsEnum, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceStatus } from 'src/infrastructure/database/entities/Attendance';

export class AttendanceRecordDto {
  @IsNotEmpty()
  @IsNumber()
  studentId!: number;

  @IsNotEmpty()
  @IsEnum(AttendanceStatus)
  status!: AttendanceStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class TakeClassAttendanceDto {
  @IsNotEmpty()
  @IsNumber()
  classId!: number;

  @IsNotEmpty()
  @IsNumber()
  academicPeriodId!: number;

  @IsNotEmpty()
  @IsDateString()
  date!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  attendances!: AttendanceRecordDto[];
}
