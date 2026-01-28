import { IsOptional, IsString, IsDateString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateAcademicPeriodDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
