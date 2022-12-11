import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginGoogleDto {
  @IsNotEmpty()
  @IsString()
  ggToken: string;

  @IsNotEmpty()
  @IsString()
  uuid: string;
}

