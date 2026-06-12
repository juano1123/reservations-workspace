import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Professional } from './professional.entity';
import { Service } from './service.entity';
import { Business } from './business.entity';

export enum ReservationStatusEnum {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity()
export class Reservation extends BaseEntity {
  @Column({ type: 'uuid' })
  professionalId: string;

  @Column({ type: 'uuid' })
  serviceId: string;

  @Column({ type: 'uuid' })
  clientId: string;

  @Column({ type: 'uuid' })
  businessId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({
    type: 'enum',
    enum: ReservationStatusEnum,
    default: ReservationStatusEnum.PENDING,
  })
  status: ReservationStatusEnum;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes?: string;

  @ManyToOne(() => Professional, { onDelete: 'CASCADE' })
  professional: Professional;

  @ManyToOne(() => Service, { onDelete: 'CASCADE' })
  service: Service;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  client: User;

  @ManyToOne(() => Business, { onDelete: 'CASCADE' })
  business: Business;
}
