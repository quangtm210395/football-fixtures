import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNumber, IsString, Min, ValidateNested } from 'class-validator';

export class MatchInput {
  @IsString()
  homeClub: string;

  @IsString()
  awayClub: string;

  @IsNumber()
  @Min(1)
  matchDay: number;

  @IsDateString()
  matchTime: Date;
}

export class ImportMatchesInput {
  @IsNumber()
  leagueId: number;

  @ValidateNested({each: true})
  @Type(() => MatchInput)
  matches: MatchInput[]
}
