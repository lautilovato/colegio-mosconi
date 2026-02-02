import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AcademicPeriodService } from './academic-period.service';
import { AcademicPeriod } from 'src/infrastructure/database/entities/AcademicPeriod';
import { CreateAcademicPeriodDto } from './dto/createAcademicPeriod.dto';
import { UpdateAcademicPeriodDto } from './dto/updateAcademicPeriod.dto';

@Controller('academic-periods')
export class AcademicPeriodController {
  constructor(private readonly academicPeriodService: AcademicPeriodService) {}

  @Get()
  async getAllPeriods(
    @Query('classId') classId?: string,
    @Query('year') year?: string,
    @Query('isActive') isActive?: string,
  ): Promise<AcademicPeriod[]> {
    return this.academicPeriodService.findAll(classId, year, isActive);
  }

  @Get('class/:classId')
  async getPeriodsByClass(
    @Param('classId', ParseIntPipe) classId: number,
  ): Promise<AcademicPeriod[]> {
    return this.academicPeriodService.findByClass(classId);
  }

  @Get('class/:classId/active')
  async getActivePeriodByClass(
    @Param('classId', ParseIntPipe) classId: number,
  ): Promise<AcademicPeriod | null> {
    return this.academicPeriodService.findActiveByClass(classId);
  }

  @Get(':id')
  async getPeriodById(@Param('id', ParseIntPipe) id: number): Promise<AcademicPeriod> {
    return this.academicPeriodService.findOne(id);
  }

  @Post()
  async createPeriod(@Body() createDto: CreateAcademicPeriodDto): Promise<AcademicPeriod> {
    return this.academicPeriodService.create(createDto);
  }

  @Patch(':id')
  async updatePeriod(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAcademicPeriodDto,
  ): Promise<AcademicPeriod> {
    return this.academicPeriodService.update(id, updateDto);
  }

  @Delete(':id')
  async deletePeriod(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.academicPeriodService.delete(id);
  }
}
