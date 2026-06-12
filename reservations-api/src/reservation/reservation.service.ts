import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

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
