import { match } from 'assert';

import { Body, Get, HttpCode, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import winston from 'winston';
import { Response } from 'aws-sdk';
import { ResponseSchema } from 'routing-controllers-openapi';

import { Logger } from '@Decorators/Logger';

import { Match } from '@Entities/Match';

import { MatchService } from '@Services/MatchService';
import { ImportMatchesInput } from '@Services/types/ImportMatchesInput';

import { MatchArrayRes } from '@Rests/types/MatchArrayRes';

@Service()
@JsonController('/matches')
export class MatchController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly matchService: MatchService,
  ) {}

  @Get('/')
  @ResponseSchema(MatchArrayRes)
  public async getAllMatches() {
    const matches = await this.matchService.getAllMatches();
    matches.forEach(m => {
      this.logger.info('date: ', m.matchTime.toISOString(), m.matchTime.toUTCString(), m.matchTime.toString());
    });
    return new MatchArrayRes().withItems(matches);
  }

  @Post('/bulk-insert')
  @HttpCode(201)
  @ResponseSchema(MatchArrayRes, {statusCode: 201})
  public async importMatches(@Body() body: ImportMatchesInput) {
    body.matches.forEach(m => {
      m.matchTime = new Date(m.matchTime);
      this.logger.info('date: ', m.matchTime.toISOString(), m.matchTime.toUTCString(), m.matchTime.toString());
    });
    const matches = await this.matchService.importMatches(body.leagueId, body.matches);
    return new MatchArrayRes().withItems(matches);
  }
}
