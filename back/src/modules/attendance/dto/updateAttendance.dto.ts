import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateAttendanceDto {
  @IsString()
  @IsIn(['present', 'absent', 'late', 'justified'])
  @IsOptional()
  status?: 'present' | 'absent' | 'late' | 'justified';
}
