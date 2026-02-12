import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SeatEntity } from '../seats/seat.entity';
import { TrainEntity } from '../trains/train.entity';

@Entity('seat_allocation')
export class SeatAllocationEntity {
  @PrimaryGeneratedColumn({ name: 'allocation_id' })
  allocationId: number;

  @ManyToOne(() => SeatEntity, { eager: true }) 
  @JoinColumn({ name: 'seat_id' })
  seat: SeatEntity;

  @ManyToOne(() => TrainEntity)
  @JoinColumn({ name: 'train_id' })
  train: TrainEntity;

  @Column({ name: 'travel_date', type: 'date' })
  travelDate: Date;

  @Column()
  status: string;
}
