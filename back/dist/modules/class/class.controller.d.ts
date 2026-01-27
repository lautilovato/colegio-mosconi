import { ClassService } from './class.service';
import { Class } from 'src/infrastructure/database/entities/Class';
import { UpdateClassDto } from './dto/updateClass.dto';
import { CreateClassDto } from './dto/createClass.dto';
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    getAllClasses(name?: string, year?: string): Promise<Class[]>;
    getClassById(id: number): Promise<Class>;
    createClass(createClassDto: CreateClassDto): Promise<Class>;
    deleteClass(id: number): Promise<void>;
    updateClass(id: number, updateClassDto: UpdateClassDto): Promise<Class>;
}
