import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { AcademicPeriod } from 'src/infrastructure/database/entities/AcademicPeriod';
import { Class } from 'src/infrastructure/database/entities/Class';
import { CreateAcademicPeriodDto } from './dto/createAcademicPeriod.dto';
import { UpdateAcademicPeriodDto } from './dto/updateAcademicPeriod.dto';
import { TransactionalMikroOrmClass } from 'src/shared/decorators/transactional-mikro-orm.decorator';
import { AcademicPeriodRepository } from './academic-period.repository';

@Injectable()
@TransactionalMikroOrmClass()
export class AcademicPeriodService {
  constructor(
    private readonly academicPeriodRepository: AcademicPeriodRepository,
    private readonly em: EntityManager,
  ) {}

  async create(createDto: CreateAcademicPeriodDto): Promise<AcademicPeriod> {
    const classEntity = await this.em.findOne(Class, { id: createDto.classId });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${createDto.classId} not found`);
    }

    const overlapping = await this.academicPeriodRepository.findOne({
      class: classEntity,
      $or: [
        {
          startDate: { $lte: new Date(createDto.endDate) },
          endDate: { $gte: new Date(createDto.startDate) },
        },
      ],
    });

    if (overlapping) {
      throw new BadRequestException(
        'Ya existe un período académico que se solapa con estas fechas para esta clase',
      );
    }

    if (createDto.isActive) {
      await this.em.nativeUpdate(
        AcademicPeriod,
        { class: classEntity, isActive: true },
        { isActive: false },
      );
    }

    const academicPeriod = this.em.create(AcademicPeriod, {
      name: createDto.name,
      startDate: new Date(createDto.startDate),
      endDate: new Date(createDto.endDate),
      year: createDto.year,
      isActive: createDto.isActive || false,
      class: classEntity,
    });

    await this.em.persistAndFlush(academicPeriod);
    return academicPeriod;
  }

  async findAll(classId?: string, year?: string, isActive?: string): Promise<AcademicPeriod[]> {
    const filter: any = {};

    if (classId && classId.trim()) {
      const classIdNum = parseInt(classId.trim());
      if (!isNaN(classIdNum)) {
        filter.class = classIdNum;
      }
    }

    if (year && year.trim()) {
      const yearNum = parseInt(year.trim());
      if (!isNaN(yearNum)) {
        filter.year = yearNum;
      }
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    return this.academicPeriodRepository.find(filter, {
      populate: ['class'],
      orderBy: { year: 'DESC', startDate: 'DESC' },
    });
  }

  async findByClass(classId: number): Promise<AcademicPeriod[]> {
    return this.academicPeriodRepository.find(
      { class: classId },
      { orderBy: { year: 'DESC', startDate: 'DESC' } },
    );
  }

  async findActiveByClass(classId: number): Promise<AcademicPeriod | null> {
    return this.academicPeriodRepository.findOne({
      class: classId,
      isActive: true,
    });
  }

  async findOne(id: number): Promise<AcademicPeriod> {
    const academicPeriod = await this.academicPeriodRepository.findOne(
      { id },
      { populate: ['class'] },
    );

    if (!academicPeriod) {
      throw new NotFoundException(`Academic period with id ${id} not found`);
    }

    return academicPeriod;
  }

  async update(id: number, updateDto: UpdateAcademicPeriodDto): Promise<AcademicPeriod> {
    const academicPeriod = await this.findOne(id);

    if (updateDto.startDate) {
      academicPeriod.startDate = new Date(updateDto.startDate);
    }
    if (updateDto.endDate) {
      academicPeriod.endDate = new Date(updateDto.endDate);
    }
    if (updateDto.name !== undefined) {
      academicPeriod.name = updateDto.name;
    }
    if (updateDto.year !== undefined) {
      academicPeriod.year = updateDto.year;
    }
    if (updateDto.isActive !== undefined) {
      if (updateDto.isActive) {
        await this.em.nativeUpdate(
          AcademicPeriod,
          { class: academicPeriod.class, isActive: true, id: { $ne: id } },
          { isActive: false },
        );
      }
      academicPeriod.isActive = updateDto.isActive;
    }

    await this.em.flush();
    return academicPeriod;
  }

  async delete(id: number): Promise<void> {
    const academicPeriod = await this.findOne(id);
    await this.em.removeAndFlush(academicPeriod);
  }
}
