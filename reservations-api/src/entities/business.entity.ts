import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
import { User } from './user.entity';
import { Professional } from './professional.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Business extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  email?: string;

  @Column({ type: 'varchar' })
  ownerId: string;

  @ManyToOne(() => User, (user) => user.business, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @OneToMany(() => Service, (service) => service.business, {
    cascade: true,
    nullable: true,
  })
  services?: Service[];

  @OneToMany(() => Professional, (professional) => professional.business, {
    cascade: true,
    nullable: true,
  })
  professionals?: Professional[];

  @OneToMany(() => Schedule, (schedule) => schedule.business, {
    cascade: true,
    nullable: true,
  })
  schedules?: Schedule[];
}
