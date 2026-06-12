import { IService } from "./IService";

export interface IProfessional {
  id: string;
  userId: string;
  businessId: string;
  user?: {
    firstName: string;
    lastName: string;
  };
  services?: IService[];
}

export interface ITimeSlot {
  startTime: string;
  endTime: string;
}

export interface IBookingState {
  service: IService | null;
  professional: IProfessional | null;
  date: Date | null;
  time: ITimeSlot | null;
}
