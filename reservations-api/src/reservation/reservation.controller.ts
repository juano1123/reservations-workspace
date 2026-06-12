import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from 'src/entities/reservation.entity';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { Public } from 'src/auth/constants';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
  ) {}

  @Public()
  @Get()
  async getAll(): Promise<Reservation[]> {
    return this.reservationService.getAll();
  }

  @Public()
  @Get(':id')
  async getById(
    @Param() { id }: { id: string },
  ): Promise<Reservation> {
    return this.reservationService.getById(id);
  }

  @Public()
  @Get('client/:clientId')
  async getByClientId(
    @Param() { clientId }: { clientId: string },
  ): Promise<Reservation[]> {
    return this.reservationService.getByClientId(clientId);
  }

  @Public()
  @Get('professional/:professionalId')
  async getByProfessionalId(
    @Param() { professionalId }: { professionalId: string },
  ): Promise<Reservation[]> {
    return this.reservationService.getByProfessionalId(professionalId);
  }

  @Public()
  @Get('business/:businessId')
  async getByBusinessId(
    @Param() { businessId }: { businessId: string },
  ): Promise<Reservation[]> {
    return this.reservationService.getByBusinessId(businessId);
  }

  @Public()
  @Get('date/:date')
  async getByDate(
    @Param() { date }: { date: string },
  ): Promise<Reservation[]> {
    return this.reservationService.getByDate(new Date(date));
  }

  @Post()
  async create(
    @Body() input: CreateReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.create(input);
  }

  @Put(':id')
  async update(
    @Param() { id }: { id: string },
    @Body() input: UpdateReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.update(id, input);
  }

  @Delete(':id')
  async delete(@Param() { id }: { id: string }): Promise<void> {
    return this.reservationService.delete(id);
  }
}
