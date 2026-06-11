import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Business } from './business.entity';

@Entity()
export class Service extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'numeric', nullable: true })
  price?: number;

  @Column({ type: 'varchar' })
  businessId: string;

  @ManyToOne(() => Business, (bussines) => bussines.services, {
    onDelete: 'CASCADE',
  })
  business: Business;
}
