import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { TransactionalMikroOrmClass } from 'src/shared/decorators/transactional-mikro-orm.decorator';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/createClass.dto';
import { UpdateClassDto } from './dto/updateClass.dto';
import { Class } from 'src/infrastructure/database/entities/Class';
import { Student } from 'src/infrastructure/database/entities/Student';
import { wrap, EntityManager } from '@mikro-orm/core';

@Injectable()
@TransactionalMikroOrmClass()
export class ClassService {
  constructor(
    private classRepository: ClassRepository,
    private readonly em: EntityManager
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const newClass = new Class();
    wrap(newClass).assign(createClassDto);
    await this.classRepository.persistAndFlush(newClass);
    return newClass;
  }

  async findOne(id: number): Promise<Class> {
    const classEntity = await this.classRepository.findOne({ id }, { populate: ['students'] });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    return classEntity;
  }

  async findAll(name?: string, year?: string): Promise<Class[]> {
    const filter: any = {};

    // Solo agregar filtros si los valores no están vacíos
    if (name && name.trim()) {
      filter.name = { $ilike: `%${name.trim()}%` };
    }

    if (year && year.trim()) {
      const yearNum = parseInt(year.trim());
      if (!isNaN(yearNum)) {
        filter.year = yearNum;
      }
    }

    return this.classRepository.find(filter, { populate: ['students'] });
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<Class> {
    const existingClass = await this.classRepository.findOne({ id });
    if (!existingClass) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    wrap(existingClass).assign(updateClassDto);
    await this.classRepository.flush();
    return existingClass;
  }

  async delete(id: number): Promise<void> {
    const existingClass = await this.classRepository.findOne({ id }); 
    if (!existingClass) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    await this.classRepository.removeAndFlush(existingClass);
  }

  // Asignar múltiples estudiantes a una clase
  async assignStudents(classId: number, studentIds: number[]): Promise<Class> {
    const classEntity = await this.classRepository.findOne({ id: classId });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }

    const students = await this.em.find(Student, { id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      throw new BadRequestException('Some students were not found');
    }

    // Asignar la clase a cada estudiante
    students.forEach(student => {student.class = classEntity;});

    await this.em.flush();
    return this.findOne(classId);
  }

  // Remover estudiantes de una clase
  async removeStudents(classId: number, studentIds: number[]): Promise<Class> {
    const classEntity = await this.classRepository.findOne({ id: classId });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }

    const students = await this.em.find(Student, {id: { $in: studentIds }, class: classEntity});

    students.forEach(student => {student.class = undefined;});

    await this.em.flush();
    return this.findOne(classId);
  }
   
}