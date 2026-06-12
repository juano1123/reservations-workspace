import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professional } from 'src/entities/professional.entity';
import { UserService } from 'src/user/user.service';
import { UserRoleEnum } from 'src/user/dtos/user-role.enum';
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { CreateProfessionalUserDto } from './dtos/create-professional-user.dto';
import { hash } from 'src/utils/security';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    private readonly userService: UserService,
  ) {}

  public async getAll(): Promise<Professional[]> {
    return this.professionalRepository.find({ relations: ['user'] });
  }

  public async getById(id: string): Promise<Professional> {
    return this.professionalRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  public async getByBusinessId(
    businessId: string,
  ): Promise<Professional[]> {
    return this.professionalRepository.find({
      where: { businessId },
      relations: ['user', 'services'],
    });
  }

  public async create(input: CreateProfessionalDto): Promise<Professional> {
    const professional = this.professionalRepository.create(input);
    return this.professionalRepository.save(professional);
  }

  public async createWithUser(
    input: CreateProfessionalUserDto,
  ): Promise<Professional> {
    const hashedPassword = await hash(input.password);

    const user = await this.userService.createUser({
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      email: input.email,
      password: hashedPassword,
      role: UserRoleEnum.PROFESSIONAL,
    });

    const professional = this.professionalRepository.create({
      userId: user.id,
      businessId: input.businessId,
    });

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
