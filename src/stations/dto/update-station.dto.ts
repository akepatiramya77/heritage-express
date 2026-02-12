import { IsOptional, IsString } from 'class-validator';

export class UpdateStationDto {
  @IsOptional()
  @IsString()
  stationName?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
