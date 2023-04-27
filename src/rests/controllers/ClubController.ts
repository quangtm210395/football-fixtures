import { Body, Get, HttpCode, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import winston from 'winston';
import { Response } from 'aws-sdk';
import { ResponseSchema } from 'routing-controllers-openapi';

import { Logger } from '@Decorators/Logger';

import { Match } from '@Entities/Match';

import { ClubService } from '@Services/ClubService';
import { ImportClubsInput } from '@Services/types/ImportClubsInput';

import { ClubArrayRes } from '@Rests/types/ClubArrayRes';

@Service()
@JsonController('/clubs')
export class ClubController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly clubService: ClubService,
  ) {}

  @Get('/')
  @ResponseSchema(ClubArrayRes)
  public async getAllClubs() {
    const clubs = await this.clubService.getAll();
    return new ClubArrayRes().withItems(clubs);
  }

  @Post('/bulk-insert')
  @HttpCode(201)
  @ResponseSchema(ClubArrayRes, {statusCode: 201})
  public async importClubs(@Body() body: ImportClubsInput) {
    const clubs = await this.clubService.importClubs(body.clubs);
    return new ClubArrayRes().withItems(clubs);
  }
}
