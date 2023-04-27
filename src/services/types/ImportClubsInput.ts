import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

import { Club } from '@Entities/Club';

export class ImportClubsInput {
  @ValidateNested({each: true})
  @Type(() => Club)
  clubs: Club[]
}
