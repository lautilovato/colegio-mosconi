import { StudentsService } from './students.service';
import { Student } from 'src/infrastructure/database/entities/Student';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { CreateStudentDto } from './dto/createStudent.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getStudentById(id: number): Promise<Student>;
    createStudent(createStudentDto: CreateStudentDto): Promise<Student>;
    deleteStudent(id: number): Promise<void>;
    updateStudent(id: number, updateStudentDto: UpdateStudentDto): Promise<Student>;
}
