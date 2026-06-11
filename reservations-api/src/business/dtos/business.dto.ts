import { Professional } from 'src/entities/professional.entity';
import { ServiceDto } from 'src/service/dtos/service.dto';
import { UserDto } from 'src/user/dtos/user.dto';

export class BusinessDto {
  name: string;
  phone?: string;
  email?: string;
  ownerId: string;
  owner: UserDto;
  services?: ServiceDto[];
  professionals?: Professional[];
}
