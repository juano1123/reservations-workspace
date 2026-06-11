import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class ClosedDay extends BaseEntity {
    @Column({ type: 'varchar' })
    scheduleId: string;

    @Column({ type: 'varchar' })
    reason: string;

    @Column({ type: 'timestamp' })
    date: Date;

    @ManyToOne(() => Schedule, (schedule) => schedule.closedDays, {
        onDelete: 'CASCADE',
    })
    schedule: Schedule;
}
