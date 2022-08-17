import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { GetCurrentUID } from 'src/auth/decorators/getUid.derator';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/add-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/new')
  async addComment(
    @GetCurrentUID() uid: number,
    @Body() commentDto: CommentDto,
  ) {
    return await this.commentService.addComment(uid, commentDto);
  }

  @Put('/:comment_id')
  async updateComment(
    @GetCurrentUID() uid: number,
    @Param('comment_id') comment_id: number,
    @Body() updateCommentDto: CommentDto,
  ) {
    return await this.commentService.updateComment(
      uid,
      comment_id,
      updateCommentDto,
    );
  }

  @Delete('/:comment_id')
  async deleteComment(
    @GetCurrentUID() uid: number,
    @Param('comment_id') comment_id: number,
  ) {
    return await this.commentService.deleteComment(uid, comment_id);
  }
}
