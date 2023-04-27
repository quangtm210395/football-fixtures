import { Get, JsonController, QueryParam, QueryParams } from 'routing-controllers';
import { Service } from 'typedi';
import winston from 'winston';
import { ResponseSchema } from 'routing-controllers-openapi';

import { Logger } from '@Decorators/Logger';

import { FixtureService } from '@Services/FixtureService';

import { FixtureArrayRes } from '@Rests/types/FixtureArrayRes';
import { LazyLoadMatchesReq } from '@Rests/types/LazyLoadMatchesReq';
import { CalendarReq } from '@Rests/types/CalendarReq';
import { CalendarRes } from '@Rests/types/CalendarRes';

@Service()
@JsonController('/fixtures')
export class FixtureController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly fixtureService: FixtureService,
  ) {}

  @Get('/lazyload')
  @ResponseSchema(FixtureArrayRes)
  public async lazyloadMatches(@QueryParams() query: LazyLoadMatchesReq) {
    const items = await this.fixtureService
      .getFixtureLazyLoad(query.leagueId, query.clientTimezone, query.fromDate, query.size, query.lastMatchCode);
    return new FixtureArrayRes().withItems(items);
  }

  @Get('/calendar')
  @ResponseSchema(CalendarRes)
  public async calendar(@QueryParams() query: CalendarReq) {
    const items = await this.fixtureService
      .getCalendar(query.leagueId, query.clientTimezone, query.fromDate, query.toDate);
    return new CalendarRes().withItems(items);
  }
}
