import { StudentsRepository } from './students.repository';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { Student } from 'src/infrastructure/database/entities/Student';
export declare class StudentsService {
    private studentsRepository;
    constructor(studentsRepository: StudentsRepository);
    findOne(id: number): Promise<Student>;
    create(newStudent: CreateStudentDto): Promise<Student>;
    update(studentId: number, updatedStudent: UpdateStudentDto): Promise<import("@mikro-orm/core").Loaded<Student, never, "*", never>>;
    delete(studentId: number): Promise<void>;
}
