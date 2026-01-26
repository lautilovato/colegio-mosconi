import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateClassDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

}