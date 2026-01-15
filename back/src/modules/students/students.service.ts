import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';

import { TransactionalMikroOrmClass } from 'src/shared/decorators/transactional-mikro-orm.decorator';
import { StudentsRepository } from './students.repository';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { Student } from 'src/infrastructure/database/entities/Student';
import { wrap } from '@mikro-orm/core';

@Injectable()
@TransactionalMikroOrmClass()
export class StudentsService {
  constructor(
    private studentsRepository: StudentsRepository
  ) {}

  async findOne(id: number): Promise<Student> {
    return this.studentsRepository.findOne(id);
  }

  async create(newStudent: CreateStudentDto) {
    const student = this.studentsRepository.create(newStudent);
    await this.studentsRepository.persistAndFlush(student);
    return student;
  }

  async update(studentId: number, updatedStudent: UpdateStudentDto) {
    const student = await this.studentsRepository.findOne(studentId);
    if (!student) {
      throw new NotFoundException('Estudiante no encontrada');
    }
    wrap(student).assign(updatedStudent, { ignoreUndefined: true });
    await this.studentsRepository.save(student);
    return student;
  }

  async delete(studentId: number) {
    const student = await this.studentsRepository.findOne(studentId);
    if (!student) {
      throw new NotFoundException('Estudiante no encontrada');
    }  
    await this.studentsRepository.removeAndFlush(student);
  }

} 