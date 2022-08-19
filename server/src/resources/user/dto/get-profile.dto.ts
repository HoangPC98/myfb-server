import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { type } from 'os';
import { CreateUserDto } from './create-user.dto';

export class GetProfileQuery {
  @IsOptional()
  user_id!: number;

  @IsOptional()
  all?: boolean;
}
