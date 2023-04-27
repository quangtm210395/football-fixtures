import { IsInt, IsNumber, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

export class LazyLoadMatchesReq {
  @IsNumber()
  leagueId: number;

  @IsInt({})
  @IsOptional()
  @Min(10)
  @Max(50)
  size = 20;

  @IsString()
  clientTimezone: string;

  @Matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/, {
    message: 'fromDate must be in format YYYY-MM-DD'
  })
  fromDate: string;

  @IsString()
  @IsOptional()
  lastMatchCode: string;
}
