import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GetListQueryPaginate } from 'src/common/common-getandpaginate-query';
import { PhotoType } from 'src/database/entities/photo.entity';
import { PrivacyMode } from 'src/database/entities/privacy.entity';
import { FileType } from 'src/types/enum-types/common.enum';

export class GetPostQueryPaginate extends GetListQueryPaginate {}
