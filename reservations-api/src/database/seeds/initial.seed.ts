import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { Business } from '../../entities/business.entity';
import { CreateBusinessDto } from '../../business/dtos/create-business.dto';
import { CreateProfessionalDto } from '../../professional/dtos/create-professional.dto';
import { Professional } from '../../entities/professional.entity';
import { Service } from '../../entities/service.entity';
import { CreateServiceDto } from '../../service/dtos/create-service.dto';
import { UserRoleEnum } from '../../user/dtos/user-role.enum';
import { hash } from '../../utils/security';

const adminUserDto: CreateUserDto = {
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'admin@admin.com',
  password: '123',
};

const professionalUserDto: CreateUserDto = {
  firstName: 'Professional',
  lastName: 'Professional',
  email: 'professional@professional.com',
  password: '123',
  role: UserRoleEnum.PROFESSIONAL,
};

const businessDto: CreateBusinessDto = {
  name: 'Local 1',
  email: 'business@business.com',
  ownerId: '1',
  phone: '091451139',
};

const professionalDto: CreateProfessionalDto = {
  userId: '1',
  businessId: '1',
};

const serviceOneDto: CreateServiceDto = {
  name: 'Service 1',
  description: 'Service 1 description',
  businessId: '1',
  price: 100,
};

const serviceTwoDto: CreateServiceDto = {
  name: 'Service 2',
  description: 'Service 2 description',
  businessId: '1',
  price: 200,
};

export default class InitialSeed implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userRepository = connection.getRepository(User);
      const user = userRepository.create({
        ...adminUserDto,
        password: await hash(adminUserDto.password),
      });
      const adminUser = await queryRunner.manager.save(User, user);
      const businnesRepository = connection.getRepository(Business);
      const firstBusiness = businnesRepository.create({
        ...businessDto,
        ownerId: adminUser.id,
      });
      const newBussines = await queryRunner.manager.save(
        Business,
        firstBusiness,
      );
      const professionalRepository = connection.getRepository(Professional);
      const professionalUser = userRepository.create({
        ...professionalUserDto,
        password: await hash(professionalUserDto.password),
      });
      const newProfessionalUser = await queryRunner.manager.save(
        User,
        professionalUser,
      );
      const firstProfessional = professionalRepository.create({
        ...professionalDto,
        userId: newProfessionalUser.id,
        businessId: newBussines.id,
      });
      await queryRunner.manager.save(Professional, firstProfessional);
      const serviceRepository = connection.getRepository(Service);
      const serviceOne = serviceRepository.create({
        ...serviceOneDto,
        businessId: newBussines.id,
      });
      const serviceTwo = serviceRepository.create({
        ...serviceTwoDto,
        businessId: newBussines.id,
      });
      await queryRunner.manager.save(Service, serviceOne);
      await queryRunner.manager.save(Service, serviceTwo);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
