import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  findAll() {
    return this.packagesService.findAll();
  }

  @Get('active')
  findActive() {
    return this.packagesService.findActive();
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreatePackageDto) {
    return this.packagesService.create(dto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: number,
    @Body() dto: UpdatePackageDto,
  ) {
    return this.packagesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.packagesService.remove(id);
  }
}
