import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ScheduleDay } from './schedule-day.entity';
import { ScheduleBlockTypeEnum } from '../schedule/enums/schedule-block-type.enum';

@Entity()
export class ScheduleBlock extends BaseEntity {
    @Column({ type: 'varchar' })
    scheduleDayId: string;

    @Column({ type: 'time' })
    startTime: string;

    @Column({ type: 'time' })
    endTime: string;

    @Column({ type: 'enum', enum: ScheduleBlockTypeEnum, default: ScheduleBlockTypeEnum.Work })
    type: ScheduleBlockTypeEnum;

    @ManyToOne(() => ScheduleDay, (day) => day.blocks, {
        onDelete: 'CASCADE',
    })
    day: ScheduleDay;
}
