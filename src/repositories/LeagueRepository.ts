import winston from 'winston';
import { Inject, Service } from 'typedi';
import { DataSource } from 'typeorm';

import { Logger } from '@Decorators/Logger';

import { League } from '@Entities/League';

import { BaseOrmRepository } from '@Repositories/BaseOrmRepository';

@Service()
export class LeagueRepository extends BaseOrmRepository<League> {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    @Inject('dataSource') dataSource: DataSource,
  ) {
    super(dataSource, League);
  }

  async create(league: League) {
    const entity = this.repo.create(league);
    await this.repo.insert(entity);
    return entity;
  }

  async findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findAll() {
    return this.repo.find();
  }
}
