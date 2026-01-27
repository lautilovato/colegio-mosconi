import {
  Body,
  Controller,
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

  // Tomar asistencia de toda una clase
  @Post('class/:classId/take')
  async takeClassAttendance(
    @Param('classId', ParseIntPipe) classId: number,
    @Body() dto: TakeClassAttendanceDto
  ): Promise<Attendance[]> {
    return this.attendanceService.takeClassAttendance(classId, dto);
  }

  // Obtener asistencia de una clase en una fecha específica
  @Get('class/:classId/date/:date')
  async getClassAttendanceByDate(
    @Param('classId', ParseIntPipe) classId: number,
    @Param('date') date: string
  ): Promise<Attendance[]> {
    return this.attendanceService.getClassAttendanceByDate(classId, date);
  }

  // Obtener historial de asistencia de un estudiante
  @Get('student/:studentId')
  async getStudentAttendanceHistory(
    @Param('studentId', ParseIntPipe) studentId: number
  ): Promise<Attendance[]> {
    return this.attendanceService.getStudentAttendanceHistory(studentId);
  }

  // Actualizar un registro de asistencia
  @Patch(':id')
  async updateAttendance(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAttendanceDto
  ): Promise<Attendance> {
    return this.attendanceService.updateAttendance(id, dto);
  }

  // Obtener reporte de asistencia de una clase
  @Get('class/:classId/report')
  async getClassAttendanceReport(
    @Param('classId', ParseIntPipe) classId: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.attendanceService.getClassAttendanceReport(classId, startDate, endDate);
  }
}
