import { IsNotEmpty, IsString, IsDateString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateAcademicPeriodDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsDateString()
  startDate!: string;

  @IsNotEmpty()
  @IsDateString()
  endDate!: string;

  @IsNotEmpty()
  @IsNumber()
  year!: number;

  @IsNotEmpty()
  @IsNumber()
  classId!: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
