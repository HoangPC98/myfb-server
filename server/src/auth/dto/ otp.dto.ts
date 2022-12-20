import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OtpType } from 'src/types/enum-types/common.enum';

export class OtpGetNewDto {
  @IsNotEmpty()
  @IsEnum(['verify_email_phone', 'forgot_password', 'mfa_authen'])
  otp_type: OtpType;

  @IsNotEmpty()
  @IsString()
  email_or_phone: string;
}
