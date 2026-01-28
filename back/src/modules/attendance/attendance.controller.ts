import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from 'src/infrastructure/database/entities/Attendance';
import { TakeClassAttendanceDto } from './dto/takeClassAttendance.dto';
import { UpdateAttendanceDto } from './dto/updateAttendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('class')
  async takeClassAttendance(@Body() dto: TakeClassAttendanceDto): Promise<Attendance[]> {
    return this.attendanceService.takeClassAttendance(dto);
  }

  @Get('student/:studentId')
  async getStudentAttendance(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Query('academicPeriodId') academicPeriodId?: string,
  ): Promise<Attendance[]> {
    const periodId = academicPeriodId ? parseInt(academicPeriodId) : undefined;
    return this.attendanceService.getStudentAttendance(studentId, periodId);
  }

  @Get('class/:classId')
  async getClassAttendance(
    @Param('classId', ParseIntPipe) classId: number,
    @Query('academicPeriodId') academicPeriodId?: string,
    @Query('date') date?: string,
  ): Promise<Attendance[]> {
    const periodId = academicPeriodId ? parseInt(academicPeriodId) : undefined;
    return this.attendanceService.getClassAttendance(classId, periodId, date);
  }

  @Get('class/:classId/report')
  async getClassAttendanceReport(
    @Param('classId', ParseIntPipe) classId: number,
    @Query('academicPeriodId') academicPeriodId?: string,
  ) {
    const periodId = academicPeriodId ? parseInt(academicPeriodId) : undefined;
    return this.attendanceService.getClassAttendanceReport(classId, periodId);
  }

  @Patch(':id')
  async updateAttendance(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendanceService.updateAttendance(id, dto);
  }

  @Delete(':id')
  async deleteAttendance(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.attendanceService.deleteAttendance(id);
  }
}
