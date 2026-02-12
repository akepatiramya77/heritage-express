import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TrainEntity } from '../trains/train.entity';
import { SeatEntity } from '../seats/seat.entity';

@Entity({ name: 'train_coach' })
export class TrainCoachEntity {

  @PrimaryGeneratedColumn({ name: 'coach_id' })
  coachId: number;

  @Column({ name: 'coach_code' })
  coachCode: string;

  @Column({ name: 'coach_type' })
  coachType: string;

  @Column({ name: 'seat_count' })
  seatCount: number;

  @ManyToOne(() => TrainEntity, (train) => train.coaches, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'train_id' })
  train: TrainEntity;

  @OneToMany(() => SeatEntity, (seat) => seat.coach)
  seats: SeatEntity[];

  @Column({ default: 'ACTIVE' })
  status: string;
}
