import { UserRoleEnum } from './user-role.enum';

export class UserDto {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  role?: UserRoleEnum;
}
