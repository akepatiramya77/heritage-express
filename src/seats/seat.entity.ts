import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TrainCoachEntity } from '../train-coaches/train-coach.entity';

@Entity({ name: 'seat' })
export class SeatEntity {
  @PrimaryGeneratedColumn({ name: 'seat_id' })
  seatId: number;

  @Column({ name: 'seat_no' })
  seatNo: string;

  @ManyToOne(() => TrainCoachEntity, (coach) => coach.seats, {
    nullable: false,
  })
  @JoinColumn({ name: 'coach_id' })
  coach: TrainCoachEntity;

  @Column({ default: 'AVAILABLE' })
  status: string;
}
