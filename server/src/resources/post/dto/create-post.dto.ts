import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PhotoType } from 'src/database/entities/photo.entity';
import { PrivacyMode } from 'src/database/entities/privacy.entity';
import { FileType } from 'src/types/enum-types/common.enum';

export class CreatePostDto {
  @IsOptional()
  text: string;

  @IsOptional()
  @IsEnum(['post', 'avatar', 'cover_photo'])
  photo_type: PhotoType;

  @IsOptional()
  @IsEnum({ type: PrivacyMode })
  privacy_mode: PrivacyMode;
}
