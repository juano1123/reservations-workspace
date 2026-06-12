import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Business } from './business.entity';
import { Professional } from './professional.entity';

@Entity()
export class Service extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'numeric', nullable: true })
  price?: number;

  @Column({ type: 'int', default: 60 })
  duration: number;

  @Column({ type: 'varchar' })
  businessId: string;

  @ManyToOne(() => Business, (bussines) => bussines.services, {
    onDelete: 'CASCADE',
  })
  business: Business;

  @ManyToMany(() => Professional, (professional) => professional.services)
  professionals?: Professional[];
}
