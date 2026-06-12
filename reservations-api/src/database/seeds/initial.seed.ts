import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Business } from '../../entities/business.entity';
import { Professional } from '../../entities/professional.entity';
import { Service } from '../../entities/service.entity';
import { Schedule } from '../../entities/schedule.entity';
import { ScheduleDay } from '../../entities/schedule-day.entity';
import { ScheduleBlock } from '../../entities/schedule-block.entity';
import { UserRoleEnum } from '../../user/dtos/user-role.enum';
import { WeekdayEnum } from '../../schedule/enums/weekdays.enum';
import { ScheduleBlockTypeEnum } from '../../schedule/enums/schedule-block-type.enum';
import { hash } from '../../utils/security';

const BUSINESS_ID = '1cc95674-53bd-4e62-8724-c4665b150cb3';
const CLIENT_ID = '22222222-2222-4222-8222-222222222222';

const servicesData = [
  {
    name: 'Uñas en acrílico',
    description:
      'Debes elegir esta técnica siempre y cuando quieras alargar la uña, ya que es muy duradera y permite que crezca la uña natural por debajo. Se realiza mantenimiento cada 15-20 días.',
    price: 1000,
    duration: 90,
  },
  {
    name: 'Mantenimiento de uñas en acrílico',
    description:
      'Relleno que se realiza cuando la uña en acrílico tiene crecimiento.',
    price: 220,
    duration: 45,
  },
  {
    name: 'Pedicuria completa',
    description:
      'El servicio de Pedicuria incluye retiro de durezas y/o callosidades, también corte y arreglo de uñas, puede incluir esmaltado semipermanente si lo desea.',
    price: 980,
    duration: 60,
  },
  {
    name: 'Esmaltado semipermanente',
    description:
      'Esmaltado de secado inmediato y de larga duración (aprox: 20 días)',
    price: 100,
    duration: 30,
  },
  {
    name: 'Kapping de acrílico',
    description:
      'Esta técnica es usada en nuestro salón para casos en que la uña no acepte correctamente el kapping en gel, como segunda opción para lograr resistencia.',
    price: 300,
    duration: 60,
  },
  {
    name: 'Kapping en gel',
    description:
      'Esta técnica fortalece superficialmente la uña, haciéndola más gruesa y resistente. El servicio incluye esmaltado semipermanente.',
    price: 200,
    duration: 45,
  },
];

const professionalsData = [
  {
    firstName: 'María',
    lastName: 'García',
    email: 'maria@candelaria.com',
  },
  {
    firstName: 'Laura',
    lastName: 'Martínez',
    email: 'laura@candelaria.com',
  },
  {
    firstName: 'Sofía',
    lastName: 'Rodríguez',
    email: 'sofia@candelaria.com',
  },
];

export default class InitialSeed implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userRepository = connection.getRepository(User);

      // Admin user
      const adminUser = userRepository.create({
        firstName: 'Admin',
        lastName: 'Candelaria',
        email: 'admin@candelaria.com',
        password: await hash('admin123'),
        role: UserRoleEnum.ADMIN,
      });
      const savedAdmin = await queryRunner.manager.save(User, adminUser);

      // Business with fixed ID
      const businessRepo = connection.getRepository(Business);
      const business = businessRepo.create({
        id: BUSINESS_ID,
        name: 'Candelaria Nails',
        email: 'info@candelaria.com',
        phone: '099123456',
        ownerId: savedAdmin.id,
      });
      const savedBusiness = await queryRunner.manager.save(Business, business);

      // Sample client user with fixed ID
      const clientUser = userRepository.create({
        id: CLIENT_ID,
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'cliente@candelaria.com',
        password: await hash('cliente123'),
        role: UserRoleEnum.CLIENT,
        phoneNumber: '098765432',
      });
      await queryRunner.manager.save(User, clientUser);

      // Professional users + Professional records
      const professionalRepo = connection.getRepository(Professional);
      const savedProfessionals: Professional[] = [];

      for (const pData of professionalsData) {
        const profUser = userRepository.create({
          firstName: pData.firstName,
          lastName: pData.lastName,
          email: pData.email,
          password: await hash('prof123'),
          role: UserRoleEnum.PROFESSIONAL,
          phoneNumber: '099111222',
        });
        const savedProfUser = await queryRunner.manager.save(User, profUser);

        const professional = professionalRepo.create({
          userId: savedProfUser.id,
          businessId: savedBusiness.id,
        });
        const saved = await queryRunner.manager.save(Professional, professional);
        savedProfessionals.push(saved);
      }

      // Services
      const serviceRepo = connection.getRepository(Service);
      const savedServices: Service[] = [];
      for (const sData of servicesData) {
        const service = serviceRepo.create({
          ...sData,
          businessId: savedBusiness.id,
        });
        const saved = await queryRunner.manager.save(Service, service);
        savedServices.push(saved);
      }

      // Link professionals to services (each professional does a subset)
      // María: all services
      savedProfessionals[0].services = savedServices;
      await queryRunner.manager.save(Professional, savedProfessionals[0]);
      // Laura: only nail-related (first 2 + last 2)
      savedProfessionals[1].services = [
        savedServices[0], savedServices[1], savedServices[4], savedServices[5],
      ];
      await queryRunner.manager.save(Professional, savedProfessionals[1]);
      // Sofía: pedicure + esmaltado + kapping gel
      savedProfessionals[2].services = [
        savedServices[2], savedServices[3], savedServices[5],
      ];
      await queryRunner.manager.save(Professional, savedProfessionals[2]);

      // Schedule: Monday to Friday, 09:00 - 18:00, Break 12:00 - 14:00
      const scheduleRepo = connection.getRepository(Schedule);
      const schedule = scheduleRepo.create({
        businessId: savedBusiness.id,
      });
      const savedSchedule = await queryRunner.manager.save(Schedule, schedule);

      const weekdays = [
        WeekdayEnum.Monday,
        WeekdayEnum.Tuesday,
        WeekdayEnum.Wednesday,
        WeekdayEnum.Thursday,
        WeekdayEnum.Friday,
      ];

      const scheduleDayRepo = connection.getRepository(ScheduleDay);
      const scheduleBlockRepo = connection.getRepository(ScheduleBlock);

      for (const day of weekdays) {
        const scheduleDay = scheduleDayRepo.create({
          scheduleId: savedSchedule.id,
          day,
          startTime: '09:00',
          endTime: '18:00',
        });
        const savedDay = await queryRunner.manager.save(
          ScheduleDay,
          scheduleDay,
        );

        const morningBlock = scheduleBlockRepo.create({
          scheduleDayId: savedDay.id,
          startTime: '09:00',
          endTime: '12:00',
          type: ScheduleBlockTypeEnum.Work,
        });
        await queryRunner.manager.save(ScheduleBlock, morningBlock);

        const breakBlock = scheduleBlockRepo.create({
          scheduleDayId: savedDay.id,
          startTime: '12:00',
          endTime: '14:00',
          type: ScheduleBlockTypeEnum.Break,
        });
        await queryRunner.manager.save(ScheduleBlock, breakBlock);

        const afternoonBlock = scheduleBlockRepo.create({
          scheduleDayId: savedDay.id,
          startTime: '14:00',
          endTime: '18:00',
          type: ScheduleBlockTypeEnum.Work,
        });
        await queryRunner.manager.save(ScheduleBlock, afternoonBlock);
      }

      await queryRunner.commitTransaction();
      console.log('Seed completed successfully');
      console.log(`Business ID: ${savedBusiness.id}`);
      console.log('Admin: admin@candelaria.com / admin123');
      console.log('Client: cliente@candelaria.com / cliente123');
      console.log('Professionals: maria@candelaria.com, laura@candelaria.com, sofia@candelaria.com / prof123');
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
