import {IsString, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class CreateClassDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

}