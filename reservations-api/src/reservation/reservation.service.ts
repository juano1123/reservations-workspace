import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import {
  Reservation,
  ReservationStatusEnum,
} from 'src/entities/reservation.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { ScheduleBlockTypeEnum } from 'src/schedule/enums/schedule-block-type.enum';
import { WeekdayEnum } from 'src/schedule/enums/weekdays.enum';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  private getWeekday(date: Date): WeekdayEnum {
    const days: WeekdayEnum[] = [
      WeekdayEnum.Sunday,
      WeekdayEnum.Monday,
      WeekdayEnum.Tuesday,
      WeekdayEnum.Wednesday,
      WeekdayEnum.Thursday,
      WeekdayEnum.Friday,
      WeekdayEnum.Saturday,
    ];
    return days[date.getDay()];
  }

  private timeToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  private async validateAvailability(
    dto: CreateReservationDto,
  ): Promise<void> {
    const weekday = this.getWeekday(new Date(dto.date));
    const startMin = this.timeToMinutes(dto.startTime);
    const endMin = this.timeToMinutes(dto.endTime);

    if (startMin >= endMin) {
      throw new BadRequestException('startTime must be before endTime');
    }

    const schedules = await this.scheduleRepository.find({
      where: { businessId: dto.businessId },
      relations: ['days', 'days.blocks', 'closedDays'],
    });

    if (!schedules.length) {
      throw new NotFoundException('No schedule found for this business');
    }

    const schedule = schedules[0];
    const scheduleDay = schedule.days?.find((d) => d.day === weekday);

    if (!scheduleDay) {
      throw new BadRequestException('The business is not open on this day');
    }

    const dayStart = this.timeToMinutes(scheduleDay.startTime);
    const dayEnd = this.timeToMinutes(scheduleDay.endTime);

    if (startMin < dayStart || endMin > dayEnd) {
      throw new BadRequestException(
        'The requested time is outside business hours',
      );
    }

    const isBreak = scheduleDay.blocks?.some(
      (block) =>
        block.type === ScheduleBlockTypeEnum.Break &&
        startMin < this.timeToMinutes(block.endTime) &&
        endMin > this.timeToMinutes(block.startTime),
    );

    if (isBreak) {
      throw new BadRequestException(
        'The requested time overlaps with a break period',
      );
    }

    const isClosed = schedule.closedDays?.some(
      (closed) =>
        new Date(closed.date).toDateString() ===
        new Date(dto.date).toDateString(),
    );

    if (isClosed) {
      throw new BadRequestException('The business is closed on this date');
    }

    const existingReservations = await this.reservationRepository.find({
      where: {
        professionalId: dto.professionalId,
        date: dto.date,
        status: In([
          ReservationStatusEnum.PENDING,
          ReservationStatusEnum.CONFIRMED,
        ]),
      },
    });

    const hasConflict = existingReservations.some((r) => {
      const existingStart = this.timeToMinutes(r.startTime);
      const existingEnd = this.timeToMinutes(r.endTime);
      return startMin < existingEnd && endMin > existingStart;
    });

    if (hasConflict) {
      throw new BadRequestException('This time slot is already booked');
    }
  }

  async getAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: ['professional', 'service', 'client', 'business'],
    });
  }

  async getById(id: string): Promise<Reservation> {
    return this.reservationRepository.findOne({
      where: { id },
      relations: ['professional', 'service', 'client', 'business'],
    });
  }

  async getByClientId(clientId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { clientId },
      relations: ['professional', 'service', 'business'],
      order: { date: 'ASC' },
    });
  }

  async getByProfessionalId(
    professionalId: string,
  ): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { professionalId },
      relations: ['client', 'service', 'business'],
      order: { date: 'ASC' },
    });
  }

  async getByBusinessId(businessId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { businessId },
      relations: ['professional', 'service', 'client'],
      order: { date: 'ASC' },
    });
  }

  async getByDate(date: Date): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { date },
      relations: ['professional', 'service', 'client', 'business'],
    });
  }

  async create(input: CreateReservationDto): Promise<Reservation> {
    await this.validateAvailability(input);
    const reservation = this.reservationRepository.create(input);
    return this.reservationRepository.save(reservation);
  }

  async update(
    id: string,
    input: UpdateReservationDto,
  ): Promise<Reservation> {
    await this.reservationRepository.update(id, input);
    return this.getById(id);
  }

  async delete(id: string): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
