import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TrainCoachesService } from './train-coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Train Coaches')
@ApiBearerAuth('access-token')
@Controller('train-coaches')
export class TrainCoachesController {
  constructor(private readonly service: TrainCoachesService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create coach for train' })
  create(@Body() dto: CreateCoachDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get all train coaches' })
  findAll() {
    return this.service.findAll();
  }
}
