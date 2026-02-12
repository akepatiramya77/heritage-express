import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RouteStopsService } from './route-stops.service';
import { CreateRouteStopDto } from './dto/create-route-stop.dto';

@Controller('route-stops')
export class RouteStopsController {
  constructor(private readonly service: RouteStopsService) {}

  @Post()
  create(@Body() dto: CreateRouteStopDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('route/:routeId')
  findByRoute(@Param('routeId') routeId: string) {
    return this.service.findByRoute(Number(routeId));
  }
}
