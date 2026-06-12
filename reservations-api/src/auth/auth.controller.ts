import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { SignInSuccessDto } from './dtos/signInSuccess.dto';
import { Public } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  public async login(@Body() input: LoginDto): Promise<SignInSuccessDto> {
    return await this.authService.login(input);
  }

  @Public()
  @Post('register')
  public async register(@Body() input: RegisterDto): Promise<SignInSuccessDto> {
    return await this.authService.register(input);
  }
}
