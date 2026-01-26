import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/createClass.dto';
import { UpdateClassDto } from './dto/updateClass.dto';
import { Class } from 'src/infrastructure/database/entities/Class';
import { EntityManager } from '@mikro-orm/core';
export declare class ClassService {
    private classRepository;
    private readonly em;
    constructor(classRepository: ClassRepository, em: EntityManager);
    create(createClassDto: CreateClassDto): Promise<Class>;
    findOne(id: number): Promise<Class>;
    findAll(): Promise<Class[]>;
    update(id: number, updateClassDto: UpdateClassDto): Promise<Class>;
    delete(id: number): Promise<void>;
    assignStudents(classId: number, studentIds: number[]): Promise<Class>;
    removeStudents(classId: number, studentIds: number[]): Promise<Class>;
}
