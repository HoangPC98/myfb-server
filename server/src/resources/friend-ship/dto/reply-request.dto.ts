import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReplyAddFrRequest } from 'src/types/enum-types/common.enum';

export class ReplyRequestDto {
  @IsNotEmpty()
  @IsNumber()
  request_id: number;

  @IsNotEmpty()
  @IsEnum(['accept', 'reject'])
  reply_option: ReplyAddFrRequest;
}
