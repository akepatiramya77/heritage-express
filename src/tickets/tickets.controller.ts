import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
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

import { TicketsService } from './tickets.service';
import { BookTicketDto } from './dto/book-ticket.dto';

import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Tickets')
@ApiBearerAuth('access-token')
@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(private readonly service: TicketsService) {}

  @Post('book')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Book a ticket' })
  book(@Body() body: BookTicketDto) {
    return this.service.bookTicket(body);
  }


  @Get('pnr/:pnr')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get ticket by PNR' })
  @ApiParam({ name: 'pnr', example: 'ABC12345' })
  getByPnr(@Param('pnr') pnr: string) {
    return this.service.getTicketByPnr(pnr);
  }


  @Post('cancel/:pnr')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Cancel ticket' })
  @ApiParam({ name: 'pnr', example: 'ABC12345' })
  cancel(@Param('pnr') pnr: string) {
    return this.service.cancelTicket(pnr);
  }


  @Get('my-bookings')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get my bookings (paginated)' })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'limit', example: 10, required: false })
  getMyBookings(
    @Req() req: any,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.service.getMyBookings(
      req.user.userId,
      Number(page),
      Number(limit),
    );
  }
}
