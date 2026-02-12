import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

import { TicketEntity } from './ticket.entity';
import { PassengerEntity } from '../passengers/passenger.entity';
import { SeatAllocationEntity } from '../seat-allocation/seat-allocation.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepo: Repository<TicketEntity>,

    @InjectRepository(PassengerEntity)
    private readonly passengerRepo: Repository<PassengerEntity>,

    @InjectRepository(SeatAllocationEntity)
    private readonly allocationRepo: Repository<SeatAllocationEntity>,
  ) {}

 
  async bookTicket(data: {
    seatAllocationId: number;
    passenger: {
      name: string;
      age: number;
      gender: string;
    };
  }) {
    const allocation = await this.allocationRepo.findOne({
      where: { allocationId: data.seatAllocationId },
      relations: ['seat', 'train'],
    });

    if (!allocation) {
      throw new NotFoundException('Seat allocation not found');
    }

    if (allocation.status !== 'AVAILABLE') {
      throw new BadRequestException('Seat not available');
    }

    const paymentStatus: 'SUCCESS' = 'SUCCESS';

    if (paymentStatus !== 'SUCCESS') {
      throw new BadRequestException('Payment failed');
    }

    const passenger = await this.passengerRepo.save(
      this.passengerRepo.create(data.passenger),
    );

    allocation.status = 'BOOKED';
    await this.allocationRepo.save(allocation);

    const ticket = this.ticketRepo.create({
      pnr: randomUUID().slice(0, 8).toUpperCase(),
      travelDate: allocation.travelDate,
      train: allocation.train,
      seat: allocation.seat,
      seatAllocation: allocation,
      passenger,
      status: 'CONFIRMED',
      paymentStatus: 'SUCCESS',
    });

    return this.ticketRepo.save(ticket);
  }

 
  async getTicketByPnr(pnr: string) {
    const ticket = await this.ticketRepo.findOne({
      where: { pnr },
      relations: ['train', 'passenger', 'seat', 'seatAllocation'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

 
  async cancelTicket(pnr: string) {
    const ticket = await this.ticketRepo.findOne({
      where: { pnr },
      relations: ['seatAllocation'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (ticket.status === 'CANCELLED') {
      throw new BadRequestException('Ticket already cancelled');
    }

    ticket.status = 'CANCELLED';
    ticket.paymentStatus = 'REFUNDED';

    ticket.seatAllocation.status = 'AVAILABLE';

    await this.allocationRepo.save(ticket.seatAllocation);
    await this.ticketRepo.save(ticket);

    return {
      message: 'Ticket cancelled and refunded successfully',
      pnr: ticket.pnr,
    };
  }

 
  async getMyBookings(userId: number, page = 1, limit = 10) {
    const [data, total] = await this.ticketRepo.findAndCount({
      where: {
        passenger: {
          passengerId: userId,
        },
      },
      relations: ['train', 'seat', 'seatAllocation', 'passenger'],
      skip: (page - 1) * limit,
      take: limit,
      order: { travelDate: 'DESC' },
    });

    return {
      total,
      page,
      limit,
      data,
    };
  }
}
