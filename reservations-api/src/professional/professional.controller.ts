import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { Professional } from 'src/entities/professional.entity';
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { CreateProfessionalUserDto } from './dtos/create-professional-user.dto';
import { Public } from 'src/auth/constants';

@Controller('professional')
export class ProfessionalController {
  constructor(
    private readonly professionalService: ProfessionalService,
  ) {}

  @Get()
  public async getAll(): Promise<Professional[]> {
    return this.professionalService.getAll();
  }

  @Get(':id')
  public async getById(
    @Param() { id }: { id: string },
  ): Promise<Professional> {
    return this.professionalService.getById(id);
  }

  @Public()
  @Get('business/:businessId')
  public async getByBusinessId(
    @Param() { businessId }: { businessId: string },
  ): Promise<Professional[]> {
    return this.professionalService.getByBusinessId(businessId);
  }

  @Post()
  public async create(
    @Body() input: CreateProfessionalDto,
  ): Promise<Professional> {
    return this.professionalService.create(input);
  }

  @Post('with-user')
  public async createWithUser(
    @Body() input: CreateProfessionalUserDto,
  ): Promise<Professional> {
    return this.professionalService.createWithUser(input);
  }

  @Put(':id')
  public async update(
    @Param() { id }: { id: string },
    @Body() input: Partial<CreateProfessionalDto>,
  ): Promise<Professional> {
    return this.professionalService.update(id, input);
  }

  @Delete(':id')
  public async delete(@Param() { id }: { id: string }): Promise<void> {
    return this.professionalService.delete(id);
  }
}
