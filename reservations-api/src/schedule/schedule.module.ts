import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { ScheduleDay } from 'src/entities/schedule-day.entity';
import { ScheduleBlock } from 'src/entities/schedule-block.entity';
import { ClosedDay } from 'src/entities/closed-day.entity';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Schedule,
      ScheduleDay,
      ScheduleBlock,
      ClosedDay,
    ]),
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
