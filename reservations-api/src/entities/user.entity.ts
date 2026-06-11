import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserRoleEnum } from '../user/dtos/user-role.enum';
import { Business } from './business.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 300, select: false })
  password?: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.ADMIN })
  role: UserRoleEnum;

  @OneToMany(() => Business, (business) => business.owner, {
    cascade: true,
    nullable: true,
  })
  business?: Business[];
}
