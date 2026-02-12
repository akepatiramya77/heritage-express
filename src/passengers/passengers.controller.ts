import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengersController {
  constructor(private readonly service: PassengersService) {}

  @Post()
  create(@Body() body: CreatePassengerDto) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
