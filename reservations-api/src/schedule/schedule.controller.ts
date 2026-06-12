import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from 'src/entities/schedule.entity';
import { ScheduleDay } from 'src/entities/schedule-day.entity';
import { ScheduleBlock } from 'src/entities/schedule-block.entity';
import { ClosedDay } from 'src/entities/closed-day.entity';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { CreateScheduleDayDto } from './dtos/create-schedule-day.dto';
import { CreateScheduleBlockDto } from './dtos/create-schedule-block.dto';
import { CreateClosedDayDto } from './dtos/create-closed-day.dto';
import { Public } from 'src/auth/constants';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Public()
  @Get()
  async getAll(): Promise<Schedule[]> {
    return this.scheduleService.getAll();
  }

  @Public()
  @Get(':id')
  async getById(@Param() { id }: { id: string }): Promise<Schedule> {
    return this.scheduleService.getById(id);
  }

  @Public()
  @Get('business/:businessId')
  async getByBusinessId(
    @Param() { businessId }: { businessId: string },
  ): Promise<Schedule[]> {
    return this.scheduleService.getByBusinessId(businessId);
  }

  @Post()
  async create(@Body() input: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(input);
  }

  @Put(':id')
  async update(
    @Param() { id }: { id: string },
    @Body() input: Partial<CreateScheduleDto>,
  ): Promise<Schedule> {
    return this.scheduleService.update(id, input);
  }

  @Delete(':id')
  async delete(@Param() { id }: { id: string }): Promise<void> {
    return this.scheduleService.delete(id);
  }

  @Public()
  @Get(':scheduleId/days')
  async getDays(
    @Param() { scheduleId }: { scheduleId: string },
  ): Promise<ScheduleDay[]> {
    return this.scheduleService.getDaysByScheduleId(scheduleId);
  }

  @Post(':scheduleId/days')
  async createDay(
    @Param() { scheduleId }: { scheduleId: string },
    @Body() input: CreateScheduleDayDto,
  ): Promise<ScheduleDay> {
    input.scheduleId = scheduleId;
    return this.scheduleService.createDay(input);
  }

  @Put('days/:dayId')
  async updateDay(
    @Param() { dayId }: { dayId: string },
    @Body() input: Partial<CreateScheduleDayDto>,
  ): Promise<ScheduleDay> {
    return this.scheduleService.updateDay(dayId, input);
  }

  @Delete('days/:dayId')
  async deleteDay(
    @Param() { dayId }: { dayId: string },
  ): Promise<void> {
    return this.scheduleService.deleteDay(dayId);
  }

  @Public()
  @Get('days/:dayId/blocks')
  async getBlocks(
    @Param() { dayId }: { dayId: string },
  ): Promise<ScheduleBlock[]> {
    return this.scheduleService.getBlocksByDayId(dayId);
  }

  @Post('days/:dayId/blocks')
  async createBlock(
    @Param() { dayId }: { dayId: string },
    @Body() input: CreateScheduleBlockDto,
  ): Promise<ScheduleBlock> {
    input.scheduleDayId = dayId;
    return this.scheduleService.createBlock(input);
  }

  @Put('blocks/:blockId')
  async updateBlock(
    @Param() { blockId }: { blockId: string },
    @Body() input: Partial<CreateScheduleBlockDto>,
  ): Promise<ScheduleBlock> {
    return this.scheduleService.updateBlock(blockId, input);
  }

  @Delete('blocks/:blockId')
  async deleteBlock(
    @Param() { blockId }: { blockId: string },
  ): Promise<void> {
    return this.scheduleService.deleteBlock(blockId);
  }

  @Public()
  @Get(':scheduleId/closed-days')
  async getClosedDays(
    @Param() { scheduleId }: { scheduleId: string },
  ): Promise<ClosedDay[]> {
    return this.scheduleService.getClosedDaysByScheduleId(scheduleId);
  }

  @Post(':scheduleId/closed-days')
  async createClosedDay(
    @Param() { scheduleId }: { scheduleId: string },
    @Body() input: CreateClosedDayDto,
  ): Promise<ClosedDay> {
    input.scheduleId = scheduleId;
    return this.scheduleService.createClosedDay(input);
  }

  @Delete('closed-days/:closedDayId')
  async deleteClosedDay(
    @Param() { closedDayId }: { closedDayId: string },
  ): Promise<void> {
    return this.scheduleService.deleteClosedDay(closedDayId);
  }
}
