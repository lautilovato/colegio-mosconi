import { IsNumber, IsString, IsDateString, IsIn, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class AttendanceRecordDto {
  @IsNumber()
  @IsNotEmpty()
  studentId!: number;

  @IsString()
  @IsIn(['present', 'absent', 'late', 'justified'])
  @IsNotEmpty()
  status!: 'present' | 'absent' | 'late' | 'justified';
}

export class TakeClassAttendanceDto {
  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  attendances!: AttendanceRecordDto[];
}
