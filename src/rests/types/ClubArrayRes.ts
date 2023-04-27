import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { Club } from '@Entities/Club';

import { HttpArrayResponse } from '@Rests/types/HttpArrayResponse';

export class ClubArrayRes extends HttpArrayResponse<Club> {
  @ValidateNested({each: true})
  @Type(() => Club)
  items: Club[];
}
