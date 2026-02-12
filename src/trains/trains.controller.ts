import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TrainsService } from './trains.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Trains')
@ApiBearerAuth('access-token')
@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create new train' })
  create(@Body() dto: CreateTrainDto) {
    return this.trainsService.create(dto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get all trains' })
  findAll() {
    return this.trainsService.findAll();
  }
}
