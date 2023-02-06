import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender } from 'src/types/enum-types/common.enum';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  email_or_phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  @IsEnum(['male', 'female', 'other'])
  gender: Gender;
}

