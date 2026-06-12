import { ReservationStatusEnum } from 'src/entities/reservation.entity';

export class UpdateReservationDto {
  professionalId?: string;
  serviceId?: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
  status?: ReservationStatusEnum;
  notes?: string;
}
