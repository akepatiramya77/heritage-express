import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Seats')
@ApiBearerAuth('access-token')
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create seat in coach' })
  @ApiBody({ type: CreateSeatDto })
  create(@Body() dto: CreateSeatDto) {
    return this.seatsService.create(dto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get all seats' })
  findAll() {
    return this.seatsService.findAll();
  }

  @Get('coach/:coachId')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get seats by coach' })
  @ApiParam({ name: 'coachId', example: 1 })
  getByCoach(@Param('coachId') coachId: string) {
    return this.seatsService.getSeatsByCoach(Number(coachId));
  }
}
