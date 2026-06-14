export class CreateReservationDto {
  professionalId: string;
  serviceId: string;
  clientId?: string;
  businessId: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}
