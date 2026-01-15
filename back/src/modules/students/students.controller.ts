import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from 'src/infrastructure/database/entities/Student';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { CreateStudentDto } from './dto/createStudent.dto';


@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Get(':id')
    async getStudentById(@Param('id', ParseIntPipe) id: number): Promise<Student> {
        const student = await this.studentsService.findOne(id);
        if (!student) {
            throw new NotFoundException('Estudiante no encontrado');
        }
        return student;
    }

    @Post()
    async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentsService.create(createStudentDto);
    }

    @Delete(':id')
    async deleteStudent(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.studentsService.delete(id);
    }

    @Patch(':id')
    async updateStudent(@Param('id', ParseIntPipe) id: number, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
        return this.studentsService.update(id, updateStudentDto);
    }
}