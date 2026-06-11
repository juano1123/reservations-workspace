import { BusinessDto } from 'src/business/dtos/business.dto';

export class ServiceDto {
  name: string;
  description: string;
  price?: number;
  businessId?: string;
  business?: BusinessDto;
}
