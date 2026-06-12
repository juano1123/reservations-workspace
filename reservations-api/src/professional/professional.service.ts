import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professional } from 'src/entities/professional.entity';
import { CreateProfessionalDto } from './dtos/create-professional.dto';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
  ) {}

  public async getAll(): Promise<Professional[]> {
    return this.professionalRepository.find();
  }

  public async getById(id: string): Promise<Professional> {
    return this.professionalRepository.findOne({ where: { id } });
  }

  public async getByBusinessId(
    businessId: string,
  ): Promise<Professional[]> {
    return this.professionalRepository.find({ where: { businessId } });
  }

  public async create(input: CreateProfessionalDto): Promise<Professional> {
    const professional = this.professionalRepository.create(input);
    return this.professionalRepository.save(professional);
  }

  public async update(
    id: string,
    input: Partial<CreateProfessionalDto>,
  ): Promise<Professional> {
    await this.professionalRepository.update(id, input);
    return this.getById(id);
  }

  public async delete(id: string): Promise<void> {
    await this.professionalRepository.delete(id);
  }
}
