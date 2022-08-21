import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Response,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { GetCurrentUID } from 'src/auth/decorators/getUid.derator';
import { FileType } from 'src/types/enum-types/common.enum';
import { PhotoType } from 'src/database/entities/photo.entity';

const loadConfigMulterOption = (type: any, filename?: string) => {
  return {
    storage: diskStorage({
      destination: `./public/photo/${type}`,
      filename: (req, file, cb) => {
        const suffix = extname(file.originalname);
        const fileName = `${type}-${new Date().getTime()}${suffix}`;
        cb(null, fileName);
      },
    }),
  };
};

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('new-post')
  @UseInterceptors(
    FileInterceptor('file', loadConfigMulterOption(PhotoType.Post)),
  )
  async createNewPost(
    @UploadedFile() imgFile,
    @Body() createPostDto: CreatePostDto,
    @GetCurrentUID() uid: number,
  ) {
    console.log('file...', imgFile);
    console.log('dto', createPostDto);
    return await this.postService.createNewPost(
      uid,
      createPostDto,
      imgFile ? imgFile : false,
    );
  }

  @Post('new-prfphoto')
  @UseInterceptors(
    FileInterceptor('file', loadConfigMulterOption(PhotoType.Prf)),
  )
  async addNewAvatar(
    @UploadedFile() imgFile,
    @GetCurrentUID() uid: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postService.addNewProfilePhoto(
      uid,
      createPostDto,
      imgFile ? imgFile : false,
    );
  }
}
