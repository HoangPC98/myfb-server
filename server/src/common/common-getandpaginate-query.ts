import { Injectable } from '@nestjs/common';
import { IsEnum, IsOptional } from 'class-validator';

@Injectable()
export class GetListQueryPaginate {
  @IsOptional()
  page_size: number;

  @IsOptional()
  page_number: number;

  @IsOptional()
  order_by: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order: string;
}
