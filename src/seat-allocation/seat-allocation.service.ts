import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SeatAllocationEntity } from './seat-allocation.entity';
import { SeatEntity } from '../seats/seat.entity';
import { TrainEntity } from '../trains/train.entity';

@Injectable()
export class SeatAllocationService {
  constructor(
    @InjectRepository(SeatAllocationEntity)
    private readonly allocationRepo: Repository<SeatAllocationEntity>,

    @InjectRepository(SeatEntity)
    private readonly seatRepo: Repository<SeatEntity>,

    @InjectRepository(TrainEntity)
    private readonly trainRepo: Repository<TrainEntity>,
  ) {}

  
  async allocateForTrain(trainId: number, travelDate: string) {
    const train = await this.trainRepo.findOne({
      where: { trainId },
    });

    if (!train) {
      throw new NotFoundException('Train not found');
    }

    const date = new Date(travelDate);

    const alreadyAllocated = await this.allocationRepo.findOne({
      where: {
        train: { trainId },
        travelDate: date,
      },
    });

    if (alreadyAllocated) {
      throw new BadRequestException(
        'Seat allocation already exists for this train and date',
      );
    }

    const seats = await this.seatRepo.find({
      relations: ['coach', 'coach.train'],
      where: {
        coach: {
          train: { trainId },
        },
      },
    });

    if (seats.length === 0) {
      throw new NotFoundException('No seats found for this train');
    }

    const allocations = seats.map((seat) =>
      this.allocationRepo.create({
        seat,
        train,
        travelDate: date,
        status: 'AVAILABLE',
      }),
    );

    return this.allocationRepo.save(allocations);
  }

  
  async findByTrainAndDate(trainId: number, travelDate: string) {
    return this.allocationRepo.find({
      where: {
        train: { trainId },
        travelDate: new Date(travelDate),
      },
      relations: ['seat', 'seat.coach'],
    });
  }


  async getSeatSummary(trainId: number, travelDate: string) {
    const allocations = await this.allocationRepo.find({
      where: {
        train: { trainId },
        travelDate: new Date(travelDate),
      },
    });

    if (allocations.length === 0) {
      throw new NotFoundException('No allocation found for this train/date');
    }

    const totalSeats = allocations.length;
    const availableSeats = allocations.filter(
      (a) => a.status === 'AVAILABLE',
    ).length;
    const bookedSeats = allocations.filter(
      (a) => a.status === 'BOOKED',
    ).length;

    return {
      trainId,
      travelDate,
      totalSeats,
      availableSeats,
      bookedSeats,
    };
  }

  
  async getAvailability(trainId: number, travelDate: string) {
    return this.getSeatSummary(trainId, travelDate);
  }
}
