import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Business } from './business.entity';
import { ScheduleDay } from './schedule-day.entity';
import { ClosedDay } from './closed-day.entity';

@Entity()
export class Schedule extends BaseEntity {
    @Column({ type: 'varchar' })
    businessId: string;

    @ManyToOne(() => Business, (business) => business.schedules, {
        onDelete: 'CASCADE',
    })
    business: Business;

    @OneToMany(() => ScheduleDay, (secheduleDay) => secheduleDay.schedule, {
        cascade: true,
        nullable: true,
    })
    days?: ScheduleDay[];

    @OneToMany(() => ClosedDay, (closedDay) => closedDay.schedule, {
        cascade: true,
        nullable: true,
    })
    closedDays?: ClosedDay[];
}
