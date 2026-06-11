import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Schedule } from './schedule.entity';
import { WeekdayEnum } from '../schedule/enums/weekdays.enum';
import { ScheduleBlock } from './schedule-block.entity';

@Entity()
export class ScheduleDay extends BaseEntity {
    @Column({ type: 'varchar' })
    scheduleId: string;

    @Column({ type: 'enum', enum: WeekdayEnum })
    day: WeekdayEnum;

    @Column({ type: 'time' })
    startTime: string;

    @Column({ type: 'time' })
    endTime: string;

    @ManyToOne(() => Schedule, (schedule) => schedule.days, {
        onDelete: 'CASCADE',
    })
    schedule: Schedule;

    @OneToMany(() => ScheduleBlock, (block) => block.day, {
        cascade: true,
        nullable: true,
    })
    blocks?: ScheduleBlock[];
}
