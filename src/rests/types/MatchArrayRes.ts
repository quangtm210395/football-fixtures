import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { Match } from '@Entities/Match';

import { HttpArrayResponse } from '@Rests/types/HttpArrayResponse';

export class MatchArrayRes extends HttpArrayResponse<Match> {
  @ValidateNested({each: true})
  @Type(() => Match)
  items: Match[];
}
