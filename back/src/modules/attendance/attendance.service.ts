import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Attendance, AttendanceStatus } from 'src/infrastructure/database/entities/Attendance';
import { Student } from 'src/infrastructure/database/entities/Student';
import { Class } from 'src/infrastructure/database/entities/Class';
import { AcademicPeriod } from 'src/infrastructure/database/entities/AcademicPeriod';
import { TakeClassAttendanceDto } from './dto/takeClassAttendance.dto';
import { UpdateAttendanceDto } from './dto/updateAttendance.dto';
import { TransactionalMikroOrmClass } from 'src/shared/decorators/transactional-mikro-orm.decorator';
import { AttendanceRepository } from './attendance.repository';

@Injectable()
@TransactionalMikroOrmClass()
export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly em: EntityManager,
  ) {}

  async takeClassAttendance(dto: TakeClassAttendanceDto): Promise<Attendance[]> {
    const classEntity = await this.em.findOne(Class, { id: dto.classId });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${dto.classId} not found`);
    }

    const academicPeriod = await this.em.findOne(AcademicPeriod, { id: dto.academicPeriodId });
    if (!academicPeriod) {
      throw new NotFoundException(`Academic period with id ${dto.academicPeriodId} not found`);
    }

    if (academicPeriod.class.id !== classEntity.id) {
      throw new BadRequestException('El período académico no pertenece a esta clase');
    }

    if (! this.containDate(academicPeriod.startDate, academicPeriod.endDate, new Date(dto.date))) {
      throw new BadRequestException('La fecha de asistencia no está dentro del período académico');
    }

    const attendanceDate = new Date(dto.date);

    const existingAttendances = await this.attendanceRepository.find({
      class: classEntity,
      academicPeriod: academicPeriod,
      date: attendanceDate,
    });

    if (existingAttendances.length > 0) {
      existingAttendances.forEach(attendance => this.em.remove(attendance));
      await this.em.flush();
    }

    const attendances: Attendance[] = [];

    for (const record of dto.attendances) {
      const student = await this.em.findOne(Student, { id: record.studentId });
      if (!student) {
        throw new NotFoundException(`Student with id ${record.studentId} not found`);
      }

      const attendance = this.em.create(Attendance, {
        student: student,
        class: classEntity,
        academicPeriod: academicPeriod,
        date: attendanceDate,
        status: record.status,
        notes: record.notes,
      });

      attendances.push(attendance);
    }

    await this.em.persistAndFlush(attendances);
    return attendances;
  }

  containDate(startDate: Date, endDate: Date, currentDate: Date): boolean {
    // Normalizar las fechas para comparar solo año-mes-día (sin horas)
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    const current = new Date(currentDate);
    current.setHours(0, 0, 0, 0);
    
    return current >= start && current <= end;
  }

  async getStudentAttendance(studentId: number, academicPeriodId?: number): Promise<Attendance[]> {
    const filter: any = { student: studentId };
    
    if (academicPeriodId) {
      filter.academicPeriod = academicPeriodId;
    }

    return this.attendanceRepository.find(filter, {
      populate: ['class', 'academicPeriod'],
      orderBy: { date: 'DESC' },
    });
  }

  async getClassAttendance(classId: number, academicPeriodId?: number, date?: string): Promise<Attendance[]> {
    const filter: any = { class: classId };

    if (academicPeriodId) {
      filter.academicPeriod = academicPeriodId;
    }

    if (date) {
      filter.date = new Date(date);
    }

    return this.attendanceRepository.find(filter, {
      populate: ['student', 'academicPeriod'],
      orderBy: { date: 'DESC' },
    });
  }

  async updateAttendance(id: number, dto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({ id });
    if (!attendance) {
      throw new NotFoundException(`Attendance with id ${id} not found`);
    }

    if (dto.status) {
      attendance.status = dto.status;
    }
    if (dto.notes !== undefined) {
      attendance.notes = dto.notes;
    }
    if (dto.date) {
      attendance.date = new Date(dto.date);
    }

    await this.attendanceRepository.flush();
    return attendance;
  }

  async deleteAttendance(id: number): Promise<void> {
    const attendance = await this.attendanceRepository.findOne({ id });
    if (!attendance) {
      throw new NotFoundException(`Attendance with id ${id} not found`);
    }
    await this.attendanceRepository.removeAndFlush(attendance);
  }

  async checkAttendanceExists(classId: number, academicPeriodId: number, date: string,): Promise<{ exists: boolean; count: number }> {
    const attendanceDate = new Date(date);
    
    const existingAttendances = await this.attendanceRepository.find({
      class: classId,
      academicPeriod: academicPeriodId,
      date: attendanceDate,
    });

    return {
      exists: existingAttendances.length > 0,
      count: existingAttendances.length,
    };
  }

  async getClassAttendanceReport(classId: number, academicPeriodId?: number) {
    const classEntity = await this.em.findOne(
      Class,
      { id: classId },
      { populate: ['students'] },
    );
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }

    const filter: any = { class: classEntity };
    
    if (academicPeriodId) {
      filter.academicPeriod = academicPeriodId;
    }

    const attendances = await this.attendanceRepository.find(filter, {
      populate: ['student'],
    });

    const studentStats = classEntity.students.getItems().map((student) => {
      const studentAttendances = attendances.filter((a) => a.student.id === student.id);

      const total = studentAttendances.length;
      const present = studentAttendances.filter((a) => a.status === AttendanceStatus.PRESENT).length;
      const absent = studentAttendances.filter((a) => a.status === AttendanceStatus.ABSENT).length;
      const late = studentAttendances.filter((a) => a.status === AttendanceStatus.LATE).length;
      const justified = studentAttendances.filter((a) => a.status === AttendanceStatus.JUSTIFIED).length;

      const attendanceRate = total > 0 ? ((present + late) / total) * 100 : 0;

      return {
        student: {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          dni: student.dni,
        },
        statistics: {
          total,
          present,
          absent,
          late,
          justified,
          attendanceRate: attendanceRate.toFixed(2),
        },
      };
    });

    const totalAttendances = attendances.length;
    const totalPresent = attendances.filter((a) => a.status === AttendanceStatus.PRESENT).length;
    const totalAbsent = attendances.filter((a) => a.status === AttendanceStatus.ABSENT).length;
    const totalLate = attendances.filter((a) => a.status === AttendanceStatus.LATE).length;
    const totalJustified = attendances.filter((a) => a.status === AttendanceStatus.JUSTIFIED).length;

    const classAttendanceRate =
      totalAttendances > 0 ? ((totalPresent + totalLate) / totalAttendances) * 100 : 0;

    return {
      class: {
        id: classEntity.id,
        name: classEntity.name,
        year: classEntity.year,
      },
      classStatistics: {
        total: totalAttendances,
        present: totalPresent,
        absent: totalAbsent,
        late: totalLate,
        justified: totalJustified,
        attendanceRate: classAttendanceRate.toFixed(2),
      },
      students: studentStats,
    };
  }
}
