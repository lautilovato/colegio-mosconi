import { EntityManager } from '@mikro-orm/core';
import { AcademicPeriod } from 'src/infrastructure/database/entities/AcademicPeriod';
import { CreateAcademicPeriodDto } from './dto/createAcademicPeriod.dto';
import { UpdateAcademicPeriodDto } from './dto/updateAcademicPeriod.dto';
export declare class AcademicPeriodService {
    private readonly em;
    constructor(em: EntityManager);
    create(createDto: CreateAcademicPeriodDto): Promise<AcademicPeriod>;
    findAll(classId?: string, year?: string, isActive?: string): Promise<AcademicPeriod[]>;
    findByClass(classId: number): Promise<AcademicPeriod[]>;
    findActiveByClass(classId: number): Promise<AcademicPeriod | null>;
    findOne(id: number): Promise<AcademicPeriod>;
    update(id: number, updateDto: UpdateAcademicPeriodDto): Promise<AcademicPeriod>;
    delete(id: number): Promise<void>;
}
