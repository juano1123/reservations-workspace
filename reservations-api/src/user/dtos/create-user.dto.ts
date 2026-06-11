import { UserRoleEnum } from './user-role.enum';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  password: string;
  role?: UserRoleEnum;
}
