import { ScheduleBlockTypeEnum } from '../enums/schedule-block-type.enum';

export class CreateScheduleBlockDto {
  scheduleDayId: string;
  startTime: string;
  endTime: string;
  type?: ScheduleBlockTypeEnum;
}
