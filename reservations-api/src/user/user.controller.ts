import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post()
  public async createUser(@Body() input: CreateUserDto): Promise<User> {
    return await this.userService.createUser(input);
  }

  @Get(':id')
  public async getUserById(@Param() { id }: { id: string }): Promise<User> {
    return await this.userService.getUserById(id);
  }
}
