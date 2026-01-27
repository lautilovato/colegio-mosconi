import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TransactionalMikroOrmClass } from 'src/shared/decorators/transactional-mikro-orm.decorator';
import { AttendanceRepository } from './attendance.repository';
import { TakeClassAttendanceDto } from './dto/takeClassAttendance.dto';
import { UpdateAttendanceDto } from './dto/updateAttendance.dto';
import { Attendance } from 'src/infrastructure/database/entities/Attendance';
import { Student } from 'src/infrastructure/database/entities/Student';
import { Class } from 'src/infrastructure/database/entities/Class';
import { wrap, EntityManager } from '@mikro-orm/core';

@Injectable()
@TransactionalMikroOrmClass()
export class AttendanceService {
  constructor(
    private attendanceRepository: AttendanceRepository,
    private readonly em: EntityManager
  ) {}

  // Tomar asistencia de toda una clase
  async takeClassAttendance(classId: number, dto: TakeClassAttendanceDto): Promise<Attendance[]> {
    const classEntity = await this.em.findOne(Class, { id: classId });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }

    const date = new Date(dto.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date > today) {
      throw new BadRequestException('No se puede tomar asistencia de fechas futuras');
    }

    // Verificar que todos los estudiantes pertenezcan a la clase
    const studentIds = dto.attendances.map(a => a.studentId);
    const students = await this.em.find(Student, { 
      id: { $in: studentIds },
      class: classEntity 
    });

    if (students.length !== studentIds.length) {
      throw new BadRequestException('Algunos estudiantes no pertenecen a esta clase');
    }

    // Verificar si ya existe asistencia para esta fecha
    const existingAttendance = await this.attendanceRepository.find({
      class: classEntity,
      date: date
    });

    if (existingAttendance.length > 0) {
      throw new BadRequestException(`Ya existe asistencia registrada para la fecha ${dto.date}`);
    }

    // Crear los registros de asistencia
    const attendances: Attendance[] = [];
    for (const record of dto.attendances) {
      const student = students.find(s => s.id === record.studentId);
      if (student) {
        const attendance = this.attendanceRepository.create({
          student: student,
          class: classEntity,
          date: date,
          status: record.status
        });
        attendances.push(attendance);
      }
    }

    await this.em.persistAndFlush(attendances);
    return attendances;
  }

  // Obtener asistencia de una clase en una fecha específica
  async getClassAttendanceByDate(classId: number, date: string): Promise<Attendance[]> {
    const classEntity = await this.em.findOne(Class, { id: classId });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }

    return this.attendanceRepository.find(
      {
        class: classEntity,
        date: new Date(date)
      },
      { populate: ['student'] }
    );
  }

  // Obtener historial de asistencia de un estudiante
  async getStudentAttendanceHistory(studentId: number): Promise<Attendance[]> {
    const student = await this.em.findOne(Student, { id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }

    return this.attendanceRepository.find(
      { student: student },
      { 
        populate: ['class'],
        orderBy: { date: 'DESC' }
      }
    );
  }

  // Actualizar un registro de asistencia
  async updateAttendance(attendanceId: number, dto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({ id: attendanceId });
    if (!attendance) {
      throw new NotFoundException(`Attendance with id ${attendanceId} not found`);
    }

    if (dto.status) {
      attendance.status = dto.status;
    }

    await this.em.flush();
    return attendance;
  }

  // Obtener reporte de asistencia de una clase
  async getClassAttendanceReport(classId: number, startDate?: string, endDate?: string) {
    const classEntity = await this.em.findOne(Class, { id: classId }, { populate: ['students'] });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }

    const filter: any = { class: classEntity };
    
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendances = await this.attendanceRepository.find(filter, {
      populate: ['student']
    });

    // Agrupar por estudiante y calcular estadísticas
    const studentStats = classEntity.students.getItems().map(student => {
      const studentAttendances = attendances.filter(a => a.student.id === student.id);
      const total = studentAttendances.length;
      const present = studentAttendances.filter(a => a.status === 'present').length;
      const absent = studentAttendances.filter(a => a.status === 'absent').length;
      const late = studentAttendances.filter(a => a.status === 'late').length;
      const justified = studentAttendances.filter(a => a.status === 'justified').length;

      return {
        student: {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          dni: student.dni
        },
        statistics: {
          total,
          present,
          absent,
          late,
          justified,
          attendanceRate: total > 0 ? ((present + late) / total * 100).toFixed(2) : 0
        }
      };
    });

    return {
      class: {
        id: classEntity.id,
        name: classEntity.name,
        year: classEntity.year
      },
      period: {
        startDate: startDate || null,
        endDate: endDate || null
      },
      students: studentStats
    };
  }
}
