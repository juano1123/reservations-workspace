import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Business } from './business.entity';
import { Service } from './service.entity';

@Entity()
export class Professional extends BaseEntity {
  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  businessId: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Business, (business) => business.professionals, {
    onDelete: 'CASCADE',
  })
  business: Business;

  @ManyToMany(() => Service, (service) => service.professionals)
  @JoinTable({ name: 'professional_services' })
  services?: Service[];
}
