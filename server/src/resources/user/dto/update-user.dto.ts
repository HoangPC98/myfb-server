import { IsEnum, IsOptional } from 'class-validator';
import { PrivacyMode } from 'src/database/entities/privacy.entity';
import { RelationshipStatus } from 'src/database/entities/profile.entity';

export class UpdateUserInfoDto {
  @IsOptional()
  first_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  gender: string;
}

export class UpdateProfilePhoto {
  @IsOptional()
  avatar_url: string;

  @IsOptional()
  cover_photo_url: string;
}

export class UpdateUserPrivacyDto {
  @IsOptional()
  bio: string;

  @IsOptional()
  phone_number: string;

  @IsOptional()
  email: string;

  @IsOptional()
  come_from: string;

  @IsOptional()
  dob: string;

  @IsOptional()
  work_place: string;

  @IsOptional()
  @IsEnum({ type: RelationshipStatus })
  relationship_status: RelationshipStatus;
}

export class UpdatePrivacyDto {
  @IsOptional()
  @IsEnum({ type: PrivacyMode })
  view_post: PrivacyMode;

  @IsOptional()
  @IsEnum({ type: PrivacyMode })
  comment_post!: PrivacyMode;

  @IsOptional()
  @IsEnum({ type: PrivacyMode })
  share_post!: PrivacyMode;

  @IsOptional()
  @IsEnum({ type: PrivacyMode })
  reaction_post!: PrivacyMode;

  @IsOptional()
  @IsEnum({ type: PrivacyMode })
  view_friendship: PrivacyMode;

  @IsOptional()
  @IsEnum({ type: PrivacyMode })
  view_profile!: PrivacyMode;
}
