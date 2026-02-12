import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'passenger' })
export class PassengerEntity {
  @PrimaryGeneratedColumn({ name: 'passenger_id' })
  passengerId: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  gender: string;
}
