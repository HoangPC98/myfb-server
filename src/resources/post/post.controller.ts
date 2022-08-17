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
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { GetCurrentUID } from 'src/auth/decorators/getUid.derator';

const multerOption = {
  storage: diskStorage({
    destination: './public/photo/posts',
    filename: (req, file, cb) => {
      const suffix = extname(file.originalname);
      console.log('ext', suffix);
      const fileName = `${new Date().getTime()}${suffix}`;
      cb(null, fileName);
    },
  }),
};
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @Public()
  @Post('new')
  @UseInterceptors(FileInterceptor('file', multerOption))
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

  @Get('/all-for-one')
  async getAllPostByUid(@GetCurrentUID() uid: number) {
    const result = await this.postService.getAllPostByUserId(uid);
    return {
      response: result,
    };
  }
}
