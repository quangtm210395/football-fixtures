import { Type } from 'class-transformer';
import { IsBoolean, IsString, Matches, ValidateNested } from 'class-validator';

import { HttpArrayResponse } from '@Rests/types/HttpArrayResponse';

export class Day {
  @IsString()
  @Matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
  date: string;

  @IsBoolean()
  isMatchDay: boolean;
}

export class CalendarRes extends HttpArrayResponse<Day> {
  @ValidateNested({each: true})
  @Type(() => Day)
  items: Day[];
}
