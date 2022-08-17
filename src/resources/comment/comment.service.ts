import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from './dto/add-comment.dto';
import { Comment } from 'src/database/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepo: Repository<Comment>,
  ) {}
  private readonly notFoundEntityErrorMsg = 'Comment not found';

  async addComment(user_id: number, addCommentDto: CommentDto) {
    const newComment = new Comment();
    newComment.user_id = user_id;
    newComment.entity_type = addCommentDto.entity_type;
    newComment.entity_id = addCommentDto.entity_id;
    newComment.text = addCommentDto.text;
    return await this.CommentRepo.save(newComment);
  }

  async updateComment(
    user_id: number,
    comment_id: number,
    updateCommentDto: CommentDto,
  ) {
    const getComment = await this.CommentRepo.findOne({
      id: comment_id,
    });

    getComment.text = updateCommentDto.text;
    return await this.CommentRepo.save(getComment);
  }

  async deleteComment(user_id: number, comment_id: number) {
    const getComment = await this.CommentRepo.findOne({
      id: comment_id,
      user_id: user_id,
    });
    if (!getComment)
      throw new BadRequestException(
        `${this.notFoundEntityErrorMsg} for delete`,
      );
    try {
      return await this.CommentRepo.softDelete({
        id: comment_id,
        user_id: user_id,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
