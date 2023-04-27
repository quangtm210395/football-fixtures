import winston from 'winston';
import { Inject, Service } from 'typedi';
import { DataSource, In } from 'typeorm';

import { Logger } from '@Decorators/Logger';

import { Club } from '@Entities/Club';

import { BaseOrmRepository } from '@Repositories/BaseOrmRepository';

@Service()
export class ClubRepository extends BaseOrmRepository<Club> {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    @Inject('dataSource') dataSource: DataSource,
  ) {
    super(dataSource, Club);
  }

  async findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findAll() {
    return this.repo.find();
  }

  async findByCode(code: string) {
    return this.repo.findOneBy({ code });
  }

  async findByCodes(codes: string[]) {
    return this.repo.find({
      where: {
        code: In(codes),
      },
    });
  }
}
