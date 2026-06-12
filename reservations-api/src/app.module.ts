import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import options from './config/database/orm';
import { AuthGuard } from './auth/auth.guard';
import { ServiceModule } from './service/service.module';
import { ScheduleModule } from './schedule/schedule.module';
import { BusinessModule } from './business/business.module';
import { ProfessionalModule } from './professional/professional.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(options as TypeOrmModuleOptions),
    UserModule,
    AuthModule,
    ServiceModule,
    ScheduleModule,
    BusinessModule,
    ProfessionalModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
