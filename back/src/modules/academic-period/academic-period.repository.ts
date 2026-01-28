import { EntityRepository } from '@mikro-orm/core';
import { AcademicPeriod } from 'src/infrastructure/database/entities/AcademicPeriod';

export class AcademicPeriodRepository extends EntityRepository<AcademicPeriod> {}
