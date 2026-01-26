import { StudentsRepository } from './students.repository';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { Student } from 'src/infrastructure/database/entities/Student';
import { EntityManager } from '@mikro-orm/core';
export declare class StudentsService {
    private studentsRepository;
    private readonly em;
    constructor(studentsRepository: StudentsRepository, em: EntityManager);
    findOne(id: number): Promise<Student>;
    create(newStudent: CreateStudentDto): Promise<Student>;
    update(studentId: number, updatedStudent: UpdateStudentDto): Promise<import("@mikro-orm/core").Loaded<Student, never, "*", never>>;
    delete(studentId: number): Promise<void>;
}
