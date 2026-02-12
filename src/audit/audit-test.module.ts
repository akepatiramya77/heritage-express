import { Module } from '@nestjs/common';
import { AuditTestController } from './audit-test.controller';

@Module({
  controllers: [AuditTestController],
})
export class AuditTestModule {}
