import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    dni: string;

    @IsNumber()
    @IsNotEmpty()
    classId: number;
}