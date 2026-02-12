import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainCoachesService } from './train-coaches.service';
import { TrainCoachesController } from './train-coaches.controller';

import { TrainCoachEntity } from './train-coach.entity';
import { TrainEntity } from '../trains/train.entity';
import { SeatsModule } from '../seats/seats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainCoachEntity, TrainEntity]),
    SeatsModule, 
  ],
  controllers: [TrainCoachesController],
  providers: [TrainCoachesService],
})
export class TrainCoachesModule {}
