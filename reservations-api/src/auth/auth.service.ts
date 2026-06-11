import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInSuccessDto } from './dtos/signInSuccess.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(input: LoginDto): Promise<SignInSuccessDto> {
    const user = await this.userService.getUserWithPassword(input.email);
    if (!user) throw new BadRequestException('Invalid email');
    if (!(await compare(input.password, user.password)))
      throw new BadRequestException('Invalid password');
    const payload = {
      sub: user.id,
      username: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      photo: null, //TODO add photo to user entity
    };
  }
}
