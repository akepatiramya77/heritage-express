import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrainCoachEntity } from './train-coach.entity';
import { TrainEntity } from '../trains/train.entity';
import { SeatsService } from '../seats/seats.service';
import { CreateCoachDto } from './dto/create-coach.dto';

@Injectable()
export class TrainCoachesService {
  constructor(
    @InjectRepository(TrainCoachEntity)
    private readonly coachRepo: Repository<TrainCoachEntity>,

    @InjectRepository(TrainEntity)
    private readonly trainRepo: Repository<TrainEntity>,

    private readonly seatsService: SeatsService,
  ) {}

  async create(dto: CreateCoachDto) {
    const train = await this.trainRepo.findOne({
      where: { trainId: dto.trainId },
    });

    if (!train) {
      throw new NotFoundException('Train not found');
    }

    const coach = this.coachRepo.create({
      train,
      coachCode: dto.coachCode,
      coachType: dto.coachType,
      seatCount: dto.seatCount,
      status: 'ACTIVE',
    });

    const savedCoach = await this.coachRepo.save(coach);

    await this.seatsService.generateSeatsForCoach(
      savedCoach.coachId,
    );

    return savedCoach;
  }

  async findAll() {
    return this.coachRepo.find({
      relations: ['train'],
    });
  }

  async findById(coachId: number) {
    const coach = await this.coachRepo.findOne({
      where: { coachId },
      relations: ['train', 'seats'],
    });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    return coach;
  }

  async getCoachesByTrain(trainId: number) {
    const coaches = await this.coachRepo.find({
      where: {
        train: { trainId },
      },
      relations: ['train'],
    });

    if (!coaches.length) {
      throw new NotFoundException(
        `No coaches found for train id ${trainId}`,
      );
    }

    return coaches;
  }
}
