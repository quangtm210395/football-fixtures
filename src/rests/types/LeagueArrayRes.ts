import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { League } from '@Entities/League';

import { HttpArrayResponse } from '@Rests/types/HttpArrayResponse';

export class LeagueArrayRes extends HttpArrayResponse<League> {
  @ValidateNested({each: true})
  @Type(() => League)
  items: League[];
}
