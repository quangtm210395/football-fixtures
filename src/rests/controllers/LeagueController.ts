import { Body, Get, HttpCode, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import winston from 'winston';
import { ResponseSchema } from 'routing-controllers-openapi';

import { Logger } from '@Decorators/Logger';

import { League } from '@Entities/League';

import { LeagueRepository } from '@Repositories/LeagueRepository';

import { LeagueArrayRes } from '@Rests/types/LeagueArrayRes';

@Service()
@JsonController('/leagues')
export class LeagueController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly leagueRepo: LeagueRepository,
  ) {}

  @Get('/')
  @ResponseSchema(LeagueArrayRes)
  public async getAll() {
    const clubs = await this.leagueRepo.findAll();
    return new LeagueArrayRes().withItems(clubs);
  }

  @Post('/')
  @HttpCode(201)
  @ResponseSchema(League, {statusCode: 201})
  public async create(@Body() body: League) {
    return this.leagueRepo.create(body);
  }
}
