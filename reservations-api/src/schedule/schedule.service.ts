import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { ScheduleDay } from 'src/entities/schedule-day.entity';
import { ScheduleBlock } from 'src/entities/schedule-block.entity';
import { ClosedDay } from 'src/entities/closed-day.entity';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { CreateScheduleDayDto } from './dtos/create-schedule-day.dto';
import { CreateScheduleBlockDto } from './dtos/create-schedule-block.dto';
import { CreateClosedDayDto } from './dtos/create-closed-day.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(ScheduleDay)
    private readonly scheduleDayRepository: Repository<ScheduleDay>,
    @InjectRepository(ScheduleBlock)
    private readonly scheduleBlockRepository: Repository<ScheduleBlock>,
    @InjectRepository(ClosedDay)
    private readonly closedDayRepository: Repository<ClosedDay>,
  ) {}

  async getAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async getById(id: string): Promise<Schedule> {
    return this.scheduleRepository.findOne({ where: { id } });
  }

  async getByBusinessId(businessId: string): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: { businessId },
      relations: ['days', 'days.blocks', 'closedDays'],
    });
  }

  async create(input: CreateScheduleDto): Promise<Schedule> {
    const schedule = this.scheduleRepository.create(input);
    return this.scheduleRepository.save(schedule);
  }

  async update(
    id: string,
    input: Partial<CreateScheduleDto>,
  ): Promise<Schedule> {
    await this.scheduleRepository.update(id, input);
    return this.getById(id);
  }

  async delete(id: string): Promise<void> {
    await this.scheduleRepository.delete(id);
  }

  async getDaysByScheduleId(scheduleId: string): Promise<ScheduleDay[]> {
    return this.scheduleDayRepository.find({
      where: { scheduleId },
      relations: ['blocks'],
      order: { day: 'ASC' },
    });
  }

  async createDay(input: CreateScheduleDayDto): Promise<ScheduleDay> {
    const day = this.scheduleDayRepository.create(input);
    return this.scheduleDayRepository.save(day);
  }

  async updateDay(
    id: string,
    input: Partial<CreateScheduleDayDto>,
  ): Promise<ScheduleDay> {
    await this.scheduleDayRepository.update(id, input);
    return this.scheduleDayRepository.findOne({ where: { id } });
  }

  async deleteDay(id: string): Promise<void> {
    await this.scheduleDayRepository.delete(id);
  }

  async getBlocksByDayId(dayId: string): Promise<ScheduleBlock[]> {
    return this.scheduleBlockRepository.find({
      where: { scheduleDayId: dayId },
      order: { startTime: 'ASC' },
    });
  }

  async createBlock(input: CreateScheduleBlockDto): Promise<ScheduleBlock> {
    const block = this.scheduleBlockRepository.create(input);
    return this.scheduleBlockRepository.save(block);
  }

  async updateBlock(
    id: string,
    input: Partial<CreateScheduleBlockDto>,
  ): Promise<ScheduleBlock> {
    await this.scheduleBlockRepository.update(id, input);
    return this.scheduleBlockRepository.findOne({ where: { id } });
  }

  async deleteBlock(id: string): Promise<void> {
    await this.scheduleBlockRepository.delete(id);
  }

  async getClosedDaysByScheduleId(
    scheduleId: string,
  ): Promise<ClosedDay[]> {
    return this.closedDayRepository.find({
      where: { scheduleId },
      order: { date: 'ASC' },
    });
  }

  async createClosedDay(input: CreateClosedDayDto): Promise<ClosedDay> {
    const closedDay = this.closedDayRepository.create(input);
    return this.closedDayRepository.save(closedDay);
  }

  async deleteClosedDay(id: string): Promise<void> {
    await this.closedDayRepository.delete(id);
  }
}
