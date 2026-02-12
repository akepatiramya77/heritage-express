import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerEntity } from './passenger.entity';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PassengerEntity])],
  providers: [PassengersService],
  controllers: [PassengersController],
})
export class PassengersModule {}
