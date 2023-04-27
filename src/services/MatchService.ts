import moment from 'moment-timezone';
import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { NotFoundError } from '@Errors/NotFoundError';
import { ErrorCode } from '@Errors/ErrorCode';

import { Match } from '@Entities/Match';
import { Club } from '@Entities/Club';

import { MatchRepository } from '@Repositories/MatchRepository';
import { ClubRepository } from '@Repositories/ClubRepository';
import { LeagueRepository } from '@Repositories/LeagueRepository';

import { MatchInput } from '@Services/types/ImportMatchesInput';

@Service()
export class MatchService {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly matchRepo: MatchRepository,
    private readonly clubRepo: ClubRepository,
    private readonly leagueRepo: LeagueRepository,
  ) {}

  async getAllMatches() {
    return this.matchRepo.findAll();
  }

  async importMatches(leagueId: number, matches: MatchInput[]) {
    // get league info
    const league = await this.leagueRepo.findById(leagueId);
    if (!league) throw new NotFoundError(ErrorCode.LEAGUE_NOT_EXISTS, leagueId);
    // create list of Match entities
    const clubSet = new Set();
    matches.forEach(m => {
      clubSet.add(m.homeClub);
      clubSet.add(m.awayClub);
    });
    // find clubs based on the requests
    const requestClubs = Array.from(clubSet) as string[];
    const clubs = await this.clubRepo.findByCodes(requestClubs);
    // flatten clubs into a hash map, then we can easily query by code further
    const clubMap = new Map<string, Club>();
    clubs.forEach(c => {
      clubMap.set(c.code, c);
    });
    if (clubs.length !== clubSet.size) {
      // throw an error about some clubs is missing in our database
      const missingClubs = requestClubs.filter(c => !clubMap.has(c));
      throw new NotFoundError(ErrorCode.CLUBS_NOT_EXISTS, missingClubs.join(', '));
    }
    // build the values to insert matches
    const matchesToInsert = matches.map((m) => {
      const match = new Match();
      match.matchDay = m.matchDay;
      match.homeClub = clubMap.get(m.homeClub);
      match.awayClub = clubMap.get(m.awayClub);
      match.matchTime = new Date(m.matchTime);
      match.league = league;
      match.matchCode = `${moment.utc(match.matchTime).format('YYYYMMDDHHmmss')}${match.homeClub.code}${match.awayClub.code}`;
      return match;
    });
    return this.matchRepo.import(matchesToInsert);
  }
}
