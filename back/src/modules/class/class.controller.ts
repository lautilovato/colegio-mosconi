import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    NotFoundException,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { Class } from 'src/infrastructure/database/entities/Class';
import { UpdateClassDto } from './dto/updateClass.dto';
import { CreateClassDto } from './dto/createClass.dto';

@Controller('classes')
export class ClassController {
    constructor(private readonly classService: ClassService) { }

    @Get()
    async getAllClasses(): Promise<Class[]> {
        return this.classService.findAll();
    }

    @Get(':id')
    async getClassById(@Param('id', ParseIntPipe) id: number): Promise<Class> {
        return this.classService.findOne(id);
    }

    @Post()
    async createClass(@Body() createClassDto: CreateClassDto): Promise<Class> {
        return this.classService.create(createClassDto);
    }

    @Delete(':id')
    async deleteClass(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.classService.delete(id);
    }

    @Patch(':id')
    async updateClass(@Param('id', ParseIntPipe) id: number, @Body() updateClassDto: UpdateClassDto): Promise<Class> {
        return this.classService.update(id, updateClassDto);
    }

}
