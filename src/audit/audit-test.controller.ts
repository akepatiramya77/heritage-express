import { Controller, Post, Put, Delete } from '@nestjs/common';

@Controller('audit-test')
export class AuditTestController {

  @Post()
  create() {
    return { message: 'POST tested' };
  }

  @Put()
  update() {
    return { message: 'PUT tested' };
  }

  @Delete()
  remove() {
    return { message: 'DELETE tested' };
  }
}
