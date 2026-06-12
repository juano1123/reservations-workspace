import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dtos/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  public async getAllServices(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  public async getServiceById(id: string): Promise<Service> {
    return this.serviceRepository.findOne({ where: { id } });
  }

  public async createService(input: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(input);
    return this.serviceRepository.save(service);
  }

  public async updateService(
    id: string,
    input: Partial<CreateServiceDto>,
  ): Promise<Service> {
    await this.serviceRepository.update(id, input);
    return this.getServiceById(id);
  }

  public async deleteService(id: string): Promise<void> {
    await this.serviceRepository.delete(id);
  }

  public async serviceByBusinessId(businessId: string): Promise<Service[]> {
    return this.serviceRepository.find({ where: { businessId } });
  }
}
