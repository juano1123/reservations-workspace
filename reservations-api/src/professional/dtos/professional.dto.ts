import { BusinessDto } from 'src/business/dtos/business.dto';
import { UserDto } from 'src/user/dtos/user.dto';

export class ProfessionalDto {
  userId: string;
  businessId: string;
  user: UserDto;
  business: BusinessDto;
}
