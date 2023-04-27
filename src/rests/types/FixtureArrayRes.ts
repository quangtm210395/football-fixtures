import { Type } from 'class-transformer';
import { IsString, Matches, ValidateNested } from 'class-validator';

import { Match } from '@Entities/Match';

import { HttpArrayResponse } from '@Rests/types/HttpArrayResponse';

export class Fixture {
  @IsString()
  @Matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
  date: string;

  @ValidateNested({each: true})
  @Type(() => Match)
  matches: Match[];
}

export class FixtureArrayRes extends HttpArrayResponse<Fixture> {
  @ValidateNested({each: true})
  @Type(() => Fixture)
  items: Fixture[];
}
