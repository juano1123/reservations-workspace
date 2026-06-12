import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { Business } from 'src/entities/business.entity';
import { CreateBusinessDto } from './dtos/create-business.dto';
import { Public } from 'src/auth/constants';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Public()
  @Get()
  public async getAll(): Promise<Business[]> {
    return this.businessService.getAll();
  }

  @Public()
  @Get(':id')
  public async getById(@Param() { id }: { id: string }): Promise<Business> {
    return this.businessService.getById(id);
  }

  @Post()
  public async create(
    @Body() input: CreateBusinessDto,
  ): Promise<Business> {
    return this.businessService.create(input);
  }

  @Put(':id')
  public async update(
    @Param() { id }: { id: string },
    @Body() input: Partial<CreateBusinessDto>,
  ): Promise<Business> {
    return this.businessService.update(id, input);
  }

  @Delete(':id')
  public async delete(@Param() { id }: { id: string }): Promise<void> {
    return this.businessService.delete(id);
  }
}
