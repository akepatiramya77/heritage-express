import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Analytics')
@ApiBearerAuth('access-token')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  @Roles(Role.ADMIN)
  @Get('revenue')
  @ApiOperation({ summary: 'Get revenue by train' })
  @ApiQuery({ name: 'trainId', example: 1 })
  getRevenue(@Query('trainId') trainId: string) {
    return this.service.getRevenueByTrain(Number(trainId));
  }
}
