import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddFriendDto {
  @IsNotEmpty()
  @IsNumber()
  receiver_uid: number;

  @IsOptional()
  @IsNumber()
  sender_uid: number;
}
