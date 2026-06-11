import { UserRoleEnum } from 'src/user/dtos/user-role.enum';

export class SignInSuccessDto {
  accessToken: string;
  email: string;
  role: UserRoleEnum;
  phoneNumber: string;
  photo?: string;
}
