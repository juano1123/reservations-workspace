import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from 'src/entities/service.entity';
import { CreateServiceDto } from './dtos/create-service.dto';
import { Public } from 'src/auth/constants';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Public()
  @Get()
  public async getServices(): Promise<Service[]> {
    return this.serviceService.getAllServices();
  }

  @Public()
  @Get(':id')
  public async getServiceById(
    @Param() { id }: { id: string },
  ): Promise<Service> {
    return this.serviceService.getServiceById(id);
  }

  @Public()
  @Get('business/:businessId')
  public async serviceByBusinessId(
    @Param() { businessId }: { businessId: string },
  ): Promise<Service[]> {
    return this.serviceService.serviceByBusinessId(businessId);
  }

  @Post()
  public async createService(
    @Body() input: CreateServiceDto,
  ): Promise<Service> {
    return this.serviceService.createService(input);
  }

  @Put(':id')
  public async updateService(
    @Param() { id }: { id: string },
    @Body() input: Partial<CreateServiceDto>,
  ): Promise<Service> {
    return this.serviceService.updateService(id, input);
  }

  @Delete(':id')
  public async deleteService(
    @Param() { id }: { id: string },
  ): Promise<void> {
    return this.serviceService.deleteService(id);
  }
}
