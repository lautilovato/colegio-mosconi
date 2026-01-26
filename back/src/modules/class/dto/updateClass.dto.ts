import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class UpdateClassDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

}