import { AcademicPeriodService } from './academic-period.service';
import { AcademicPeriod } from 'src/infrastructure/database/entities/AcademicPeriod';
import { CreateAcademicPeriodDto } from './dto/createAcademicPeriod.dto';
import { UpdateAcademicPeriodDto } from './dto/updateAcademicPeriod.dto';
export declare class AcademicPeriodController {
    private readonly academicPeriodService;
    constructor(academicPeriodService: AcademicPeriodService);
    getAllPeriods(classId?: string, year?: string, isActive?: string): Promise<AcademicPeriod[]>;
    getPeriodsByClass(classId: number): Promise<AcademicPeriod[]>;
    getActivePeriodByClass(classId: number): Promise<AcademicPeriod | null>;
    getPeriodById(id: number): Promise<AcademicPeriod>;
    createPeriod(createDto: CreateAcademicPeriodDto): Promise<AcademicPeriod>;
    updatePeriod(id: number, updateDto: UpdateAcademicPeriodDto): Promise<AcademicPeriod>;
    deletePeriod(id: number): Promise<void>;
}
