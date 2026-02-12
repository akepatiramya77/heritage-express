import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';

import { TicketEntity } from './ticket.entity';
import { PassengerEntity } from '../passengers/passenger.entity';
import { SeatAllocationEntity } from '../seat-allocation/seat-allocation.entity';
import { TrainEntity } from '../trains/train.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TicketEntity,
      PassengerEntity,
      SeatAllocationEntity,
      TrainEntity, 
    ]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
