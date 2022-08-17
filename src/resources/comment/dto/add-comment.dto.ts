import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EntityType } from 'src/types/enum-types/common.enum';

export class CommentDto {
  @IsOptional()
  @IsNumber()
  entity_id: number;

  @IsOptional()
  @IsEnum(['comments', 'posts', 'photos'])
  entity_type: EntityType;

  @IsNotEmpty()
  @IsString()
  text: string;
}
