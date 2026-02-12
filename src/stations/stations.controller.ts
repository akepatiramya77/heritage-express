import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum'; 

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

 
  @Get()
  findAll() {
    return this.stationsService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateStationDto) {
    return this.stationsService.create(dto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateStationDto,
  ) {
    return this.stationsService.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.stationsService.remove(Number(id));
  }
}
