import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from './dto/add-comment.dto';
import { Comment } from 'src/database/entities/comment.entity';
import { getManager, Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { EntityType, NotifyType } from 'src/types/enum-types/common.enum';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly notificationService: NotificationService,
  ) {}
  private readonly notFoundEntityErrorMsg = 'Comment not found';

  async addComment(uid: number, addCommentDto: CommentDto) {
    try {
      const newComment = new Comment();
      newComment.owner_id = uid;
      newComment.entity_type = addCommentDto.entity_type;
      newComment.entity_id = addCommentDto.entity_id;
      newComment.text = addCommentDto.text;
      await this.commentRepo.save(newComment);

      const entity_name = newComment.entity_type;
      const thisEntity = await getManager()
        .createQueryBuilder(entity_name, 'entity')
        .where('id = :entity_id', { entity_id: addCommentDto.entity_id })
        .getOne();

      console.log('this Entity', thisEntity);

      // send Notification if another comment owner post
      if (uid !== thisEntity['owner_id']) {
        console.log('ltltltlt');
        await this.notificationService.sendNotificationFromOneToOne(
          uid,
          thisEntity['owner_id'],
          addCommentDto.entity_id,
          NotifyType.HasComment,
          entity_name,
        );
      }

      return { message: 'ok' };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateComment(
    user_id: number,
    comment_id: number,
    updateCommentDto: CommentDto,
  ) {
    const getComment = await this.commentRepo.findOne({
      id: comment_id,
    });

    getComment.text = updateCommentDto.text;
    return await this.commentRepo.save(getComment);
  }

  async deleteComment(user_id: number, comment_id: number) {
    const getComment = await this.commentRepo.findOne({
      id: comment_id,
      owner_id: user_id,
    });
    if (!getComment)
      throw new BadRequestException(
        `${this.notFoundEntityErrorMsg} for delete`,
      );
    try {
      return await this.commentRepo.softDelete({
        id: comment_id,
        owner_id: user_id,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
