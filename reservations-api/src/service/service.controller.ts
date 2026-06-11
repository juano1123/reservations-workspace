import { Controller, Get, Param } from '@nestjs/common';
import { ServiceDto } from './dtos/service.dto';
import { ServiceService } from './service.service';
import { Public } from 'src/auth/constants';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  public async getServices(): Promise<ServiceDto[]> {
    return this.serviceService.getAllServices();
  }

  @Get(':id')
  public async getServiceById(id: string): Promise<ServiceDto> {
    return this.serviceService.getServiceById(id);
  }

  @Public()
  @Get('business/:businessId')
  public async serviceByBusinessId(
    @Param() { businessId }: { businessId: string },
  ): Promise<ServiceDto[]> {
    return this.serviceService.serviceByBusinessId(businessId);
  }
}
