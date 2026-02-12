import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { TrainEntity } from '../trains/train.entity';
import { PassengerEntity } from '../passengers/passenger.entity';
import { SeatAllocationEntity } from '../seat-allocation/seat-allocation.entity';
import { SeatEntity } from '../seats/seat.entity';

@Entity('ticket')
export class TicketEntity {
  @PrimaryGeneratedColumn({ name: 'ticket_id' })
  ticketId: number;

  @Column({ unique: true })
  pnr: string;

  @Column({ name: 'travel_date', type: 'date' })
  travelDate: Date;

  @ManyToOne(() => TrainEntity)
  @JoinColumn({ name: 'train_id' })
  train: TrainEntity;

  @ManyToOne(() => PassengerEntity)
  @JoinColumn({ name: 'passenger_id' })
  passenger: PassengerEntity;

  @ManyToOne(() => SeatEntity)
  @JoinColumn({ name: 'seat_id' })
  seat: SeatEntity;

  @ManyToOne(() => SeatAllocationEntity)
  @JoinColumn({ name: 'seat_allocation_id' })
  seatAllocation: SeatAllocationEntity;

  @Column({ default: 'CONFIRMED' })
  status: 'CONFIRMED' | 'CANCELLED';

  @Column({
    type: 'varchar',
    default: 'PENDING',
  })
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

  @DeleteDateColumn()
  deletedAt?: Date;
}
