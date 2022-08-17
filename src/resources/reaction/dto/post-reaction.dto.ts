import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { EntityType, ReactionType } from 'src/types/enum-types/common.enum';

export class PostReactionDto {
  @IsNotEmpty()
  @IsNumber()
  entity_id: number;

  @IsNotEmpty()
  @IsEnum(['comments', 'posts', 'photos'])
  entity_type: EntityType;

  @IsNotEmpty()
  @IsEnum(['like', 'haha', 'love', 'sad', 'angry'])
  react_option: ReactionType;
}
