import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { SeatAllocationService } from './seat-allocation.service';
import { CreateSeatAllocationDto } from './dto/create-seat-allocation.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Seat Allocation')
@ApiBearerAuth('access-token')
@Controller('seat-allocations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SeatAllocationController {
  constructor(private readonly service: SeatAllocationService) {}

  
  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Allocate seats for train & travel date' })
  allocate(@Body() body: CreateSeatAllocationDto) {
    return this.service.allocateForTrain(
      body.trainId,
      body.travelDate,
    );
  }

 
  @Get('train/:trainId/date/:travelDate')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get seat list for train & date' })
  @ApiParam({ name: 'trainId', example: 1 })
  @ApiParam({ name: 'travelDate', example: '2026-03-01' })
  getByTrainAndDate(
    @Param('trainId') trainId: string,
    @Param('travelDate') travelDate: string,
  ) {
    return this.service.findByTrainAndDate(
      Number(trainId),
      travelDate,
    );
  }

 
  @Get('summary/:trainId/:travelDate')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get seat summary for train & date' })
  @ApiParam({ name: 'trainId', example: 1 })
  @ApiParam({ name: 'travelDate', example: '2026-03-01' })
  getSummary(
    @Param('trainId') trainId: string,
    @Param('travelDate') travelDate: string,
  ) {
    return this.service.getSeatSummary(
      Number(trainId),
      travelDate,
    );
  }

 
  @Get('availability')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Check seat availability using query params' })
  @ApiQuery({ name: 'trainId', example: 1 })
  @ApiQuery({ name: 'date', example: '2026-03-01' })
  getAvailability(
    @Query('trainId') trainId: string,
    @Query('date') date: string,
  ) {
    return this.service.getAvailability(
      Number(trainId),
      date,
    );
  }
}
