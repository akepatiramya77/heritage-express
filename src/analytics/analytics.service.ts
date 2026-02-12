import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from '../tickets/ticket.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepo: Repository<TicketEntity>,
  ) {}

  async getRevenueByTrain(trainId: number) {
    const tickets = await this.ticketRepo.find({
      where: {
        train: { trainId },
        status: 'CONFIRMED',
        paymentStatus: 'SUCCESS',
      },
      relations: ['train'],
    });

    const totalTickets = tickets.length;

    // Assuming each ticket has fixed price (example 1000)
    const ticketPrice = 1000;

    const totalRevenue = totalTickets * ticketPrice;

    return {
      trainId,
      totalTickets,
      ticketPrice,
      totalRevenue,
    };
  }
}
