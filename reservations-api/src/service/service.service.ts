import { Injectable } from '@nestjs/common';
import { ServiceDto } from './dtos/service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  public async getAllServices(): Promise<ServiceDto[]> {
    return this.serviceRepository.find();
  }

  public async getServiceById(id: string): Promise<ServiceDto> {
    return this.serviceRepository.findOne({ where: { id } });
  }

  public async createService(input: ServiceDto): Promise<ServiceDto> {
    const service = this.serviceRepository.create(input);
    return this.serviceRepository.save(service);
  }

  public async updateService(
    id: string,
    input: ServiceDto,
  ): Promise<ServiceDto> {
    await this.serviceRepository.update(id, input);
    return this.getServiceById(id);
  }

  public async serviceByBusinessId(businessId: string): Promise<ServiceDto[]> {
    return this.serviceRepository.find({ where: { businessId } });
  }
}
