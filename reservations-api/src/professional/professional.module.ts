import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from 'src/entities/professional.entity';
import { UserModule } from 'src/user/user.module';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Professional]), UserModule],
  providers: [ProfessionalService],
  controllers: [ProfessionalController],
  exports: [ProfessionalService],
})
export class ProfessionalModule {}
