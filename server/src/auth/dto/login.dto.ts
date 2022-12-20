import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginGoogleDto {
  @IsNotEmpty()
  @IsString()
  ggToken: string;
}

export class LoginUsrPswDto {
  @IsNotEmpty()
  @IsString()
  email_or_phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
