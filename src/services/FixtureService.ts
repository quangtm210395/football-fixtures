import { Service } from 'typedi';
import winston from 'winston';
import moment from 'moment-timezone';
import _ from 'lodash';

import { Logger } from '@Decorators/Logger';

import { MatchRepository } from '@Repositories/MatchRepository';

@Service()
export class FixtureService {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly matchRepo: MatchRepository,
  ) {}

  async getFixtureLazyLoad(leagueId: number, clientTimeZone: string,
    fromDate: string, size = 20, lastMatchCode?: string) {
    // get the tz offset of client time zone name
    const tzOffset = moment().tz(clientTimeZone).format('Z');
    // calculate the client date time to get exactly UTC string
    const date = moment.utc(`${fromDate}T00:00:00${tzOffset}`);
    const matches = await this.matchRepo.findForLazyLoad(leagueId, date.toDate(), size, lastMatchCode);
    // group the matches by date (format YYYY-MM-DD) in the client timezone
    const groupByDate = _.groupBy(matches.map(match => ({ ...match, date: moment(match.matchTime).utcOffset(tzOffset).format('YYYY-MM-DD') })), 'date');
    return Object.keys(groupByDate).map((date) => ({
      date: date,
      matches: groupByDate[date],
    }));
  }

  async getCalendar(leagueId: number, clientTimeZone: string, fromDate: string, toDate: string) {
    // get the tz offset of client time zone name
    const tzOffset = moment().tz(clientTimeZone).format('Z');
    // calculate the client date time to get exactly UTC string
    const from = moment.utc(`${fromDate}T00:00:00${tzOffset}`);
    const to = moment.utc(`${toDate}T00:00:00${tzOffset}`);

    const matches = await this.matchRepo.findByDateInRange(leagueId, from.toDate(), to.toDate());
    const matchDays = matches.map(match => moment(match.matchTime).utcOffset(tzOffset).format('YYYY-MM-DD'));
    const uniqueMatchDays = new Set(matchDays);
    const days: {date: string, isMatchDay: boolean}[] = [];
    const fromDateString = from.utcOffset(tzOffset).format('YYYY-MM-DD');
    days.push({ date: fromDateString, isMatchDay: uniqueMatchDays.has(fromDateString) });
    for (let i = from.unix() + 86400; i < to.unix(); i += 86400) {
      const dateString = moment.utc(i*1000).utcOffset(tzOffset).format('YYYY-MM-DD');
      days.push({
        date: dateString,
        isMatchDay: uniqueMatchDays.has(dateString),
      });
    }
    const toDateString = to.utcOffset(tzOffset).format('YYYY-MM-DD');
    days.push({ date: toDateString, isMatchDay: uniqueMatchDays.has(toDateString) });
    return days;
  }
}
