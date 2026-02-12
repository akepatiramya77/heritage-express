import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SeatEntity } from './seat.entity';
import { TrainCoachEntity } from '../train-coaches/train-coach.entity';
import { CreateSeatDto } from './dto/create-seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(SeatEntity)
    private readonly seatRepo: Repository<SeatEntity>,

    @InjectRepository(TrainCoachEntity)
    private readonly coachRepo: Repository<TrainCoachEntity>,
  ) {}

  async create(dto: CreateSeatDto) {
    const coach = await this.coachRepo.findOne({
      where: { coachId: dto.coachId },
    });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    
    const existingSeat = await this.seatRepo.findOne({
      where: {
        seatNo: dto.seatNo,
        coach: { coachId: dto.coachId },
      },
      relations: ['coach'],
    });

    if (existingSeat) {
      throw new BadRequestException(
        'Seat number already exists in this coach',
      );
    }

    const seat = this.seatRepo.create({
      coach,
      seatNo: dto.seatNo,
      status: 'AVAILABLE',
    });

    return this.seatRepo.save(seat);
  }

  async generateSeatsForCoach(coachId: number) {
    const coach = await this.coachRepo.findOne({
      where: { coachId },
    });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    
    const existingSeats = await this.seatRepo.count({
      where: { coach: { coachId } },
    });

    if (existingSeats > 0) {
      throw new BadRequestException(
        'Seats already generated for this coach',
      );
    }

    const seats: SeatEntity[] = [];

    for (let i = 1; i <= coach.seatCount; i++) {
      const seat = this.seatRepo.create({
        coach,
        seatNo: `${coach.coachCode}-${i}`,
        status: 'AVAILABLE',
      });

      seats.push(seat);
    }

    return this.seatRepo.save(seats);
  }


  async findAll() {
    return this.seatRepo.find({
      relations: ['coach'],
    });
  }

  
  async getSeatsByCoach(coachId: number) {
    const seats = await this.seatRepo.find({
      where: { coach: { coachId } },
      relations: ['coach'],
    });

    if (!seats.length) {
      throw new NotFoundException(
        `No seats found for coach id ${coachId}`,
      );
    }

    return seats;
  }


  async findById(seatId: number) {
    const seat = await this.seatRepo.findOne({
      where: { seatId },
      relations: ['coach'],
    });

    if (!seat) {
      throw new NotFoundException('Seat not found');
    }

    return seat;
  }
}
