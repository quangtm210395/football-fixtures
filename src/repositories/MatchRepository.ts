import winston from 'winston';
import { Inject, Service } from 'typedi';
import { Between, DataSource, InsertResult, LessThan, MoreThan, MoreThanOrEqual } from 'typeorm';

import { Logger } from '@Decorators/Logger';

import { Match } from '@Entities/Match';

import { BaseOrmRepository } from '@Repositories/BaseOrmRepository';

@Service()
export class MatchRepository extends BaseOrmRepository<Match> {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    @Inject('dataSource') dataSource: DataSource,
  ) {
    super(dataSource, Match);
  }

  async findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findAll() {
    return this.repo.find();
  }

  async findForLazyLoad(leagueId: number, fromDate: Date, size = 20, lastMatchCode?: string) {
    return this.repo.find({
      where: {
        league: { id: leagueId },
        matchTime: MoreThanOrEqual(fromDate),
        matchCode: lastMatchCode ? MoreThan(lastMatchCode): undefined,
      },
      take: size,
      order: {
        matchTime: 'ASC',
      },
      relations: ['league', 'homeClub', 'awayClub'],
    });
  }

  async findByDateInRange(leagueId: number, fromDate: Date, toDate: Date) {
    return this.repo.find({
      where: {
        league: { id: leagueId },
        matchTime: Between(fromDate, toDate),
      },
      order: {
        matchTime: 'ASC',
      },
      select: {
        matchTime: true,
      },
    });
  }

  async import(matches: Match[]){
    const entities = this.repo.create(matches);
    await this.repo.insert(entities);
    return entities;
  }
}
