import { IsInt, IsNumber, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

export class CalendarReq {
  @IsNumber()
  leagueId: number;

  @IsString()
  clientTimezone: string;

  @Matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/, {
    message: 'fromDate must be in format YYYY-MM-DD'
  })
  fromDate: string;

  @Matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/, {
    message: 'toDate must be in format YYYY-MM-DD'
  })
  toDate: string;
}
