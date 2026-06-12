import { WeekdayEnum } from '../enums/weekdays.enum';

export class CreateScheduleDayDto {
  scheduleId: string;
  day: WeekdayEnum;
  startTime: string;
  endTime: string;
}
