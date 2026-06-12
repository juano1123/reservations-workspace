export class CreateReservationDto {
  professionalId: string;
  serviceId: string;
  clientId?: string;
  businessId: string;
  date: Date;
  startTime: string;
  endTime: string;
  notes?: string;
}
