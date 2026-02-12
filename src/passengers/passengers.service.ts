import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassengerEntity } from './passenger.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(PassengerEntity)
    private readonly passengerRepo: Repository<PassengerEntity>,
  ) {}

  create(dto: CreatePassengerDto) {
    const passenger = this.passengerRepo.create(dto);
    return this.passengerRepo.save(passenger);
  }

  findAll() {
    return this.passengerRepo.find();
  }
}
