import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetProfileQuery {
  @IsOptional()
  user_id!: number;

  @IsOptional()
  all?: boolean;
}
