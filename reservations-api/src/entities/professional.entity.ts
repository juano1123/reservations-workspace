import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Business } from './business.entity';

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
}
