import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

/* Feature Modules */
import { HealthModule } from './health/health.module';
import { PackagesModule } from './packages/packages.module';
import { AuditModule } from './audit/audit.module';
import { AuditTestModule } from './audit/audit-test.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StationsModule } from './stations/stations.module';
import { RoutesModule } from './routes/routes.module';
import { RouteStopsModule } from './route-stops/route-stops.module';
import { TrainsModule } from './trains/trains.module';
import { TrainCoachesModule } from './train-coaches/train-coaches.module';
import { SeatsModule } from './seats/seats.module';
import { SeatAllocationModule } from './seat-allocation/seat-allocation.module';
import { TicketsModule } from './tickets/tickets.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PassengersModule } from './passengers/passengers.module';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, 
      }),
    }),

    HealthModule,
    AuditModule, 
    AuditTestModule,
    UsersModule,
    AuthModule,
    PackagesModule,
    StationsModule,
    RoutesModule,
    RouteStopsModule,
    TrainsModule,
    TrainCoachesModule,
    SeatsModule,
    SeatAllocationModule,
    TicketsModule,
    AnalyticsModule,
    PassengersModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
