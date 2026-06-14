import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInSuccessDto } from './dtos/signInSuccess.dto';
import { RefreshDto } from './dtos/refresh.dto';
import { UserRoleEnum } from 'src/user/dtos/user-role.enum';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(input: LoginDto): Promise<SignInSuccessDto> {
    const user = await this.userService.getUserWithPassword(input.email);
    if (!user) throw new BadRequestException('Invalid credentials');
    if (!(await compare(input.password, user.password)))
      throw new BadRequestException('Invalid credentials');
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const fullName = `${user.firstName} ${user.lastName}`.trim();
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
      id: user.id,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      fullName: fullName || undefined,
    };
  }

  public async register(input: RegisterDto): Promise<SignInSuccessDto> {
    const existing = await this.userService.getUserByEmail(input.email);
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await hash(input.password, 10);
    const nameParts = (input.fullName ?? '').split(' ');
    const firstName = nameParts[0] || input.email;
    const lastName = nameParts.slice(1).join(' ') || '';

    const user = await this.userService.createUser({
      firstName,
      lastName,
      email: input.email,
      password: hashedPassword,
      phoneNumber: input.phoneNumber,
      role: UserRoleEnum.CLIENT,
    });

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const fullName = `${user.firstName} ${user.lastName}`.trim();
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
      id: user.id,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      fullName: fullName || undefined,
    };
  }

  public async refreshToken(
    input: RefreshDto,
  ): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(input.refreshToken, {
        secret: jwtConstants.secret,
      });
      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, email: payload.email },
        { expiresIn: '1h' },
      );
      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
