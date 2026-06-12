import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from 'src/entities/business.entity';
import { CreateBusinessDto } from './dtos/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  public async getAll(): Promise<Business[]> {
    return this.businessRepository.find();
  }

  public async getById(id: string): Promise<Business> {
    return this.businessRepository.findOne({ where: { id } });
  }

  public async create(input: CreateBusinessDto): Promise<Business> {
    const business = this.businessRepository.create(input);
    return this.businessRepository.save(business);
  }

  public async update(
    id: string,
    input: Partial<CreateBusinessDto>,
  ): Promise<Business> {
    await this.businessRepository.update(id, input);
    return this.getById(id);
  }

  public async delete(id: string): Promise<void> {
    await this.businessRepository.delete(id);
  }
}
