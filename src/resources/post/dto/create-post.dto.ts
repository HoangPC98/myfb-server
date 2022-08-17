import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  text: string;
}
