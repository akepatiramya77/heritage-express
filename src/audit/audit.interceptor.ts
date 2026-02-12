import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogEntity } from './audit.entity';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(AuditLogEntity)
    private readonly auditRepo: Repository<AuditLogEntity>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(async (response) => {
        if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
          return;
        }

        try {
          await this.auditRepo.save({
            userId: req.user?.userId ?? null, 
            action: req.method,
            entity: req.baseUrl?.replace('/', '') ?? 'unknown', 
            entityId:
              response?.id ??
              response?.ticketId ??
              response?.packageId ??
              response?.trainId ??
              response?.routeId ??
              null, 
            endpoint: req.originalUrl,
            method: req.method,
            requestBody: req.body,
          });
        } catch (err) {
          console.error('Audit log failed:', err.message);
        }
      }),
    );
  }
}
