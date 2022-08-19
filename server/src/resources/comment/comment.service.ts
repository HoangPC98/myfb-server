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
import { EntityType, NotifyType, QueryOption } from 'src/types/enum-types/common.enum';
import { getEntity } from 'src/repository/common.repository';

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
      const thisEntity = await getEntity(
        addCommentDto.entity_type,
        addCommentDto.entity_id,
        QueryOption.GetOne,
      );

      const newComment = new Comment();
      newComment.owner_id = uid;
      newComment.entity_type = addCommentDto.entity_type;
      newComment.entity_id = addCommentDto.entity_id;
      newComment.text = addCommentDto.text;

      thisEntity['count_comment'] += 1;

      await getManager().transaction(async (transactionManager) => {
        await transactionManager.save(newComment);
        await transactionManager.save(thisEntity);
      });

      console.log('this Entity', thisEntity);

      // send Notification if another comment owner post
      if (uid !== thisEntity['owner_id']) {
        await this.notificationService.sendNotificationFromOneToOne(
          uid,
          thisEntity['owner_id'],
          addCommentDto.entity_id,
          NotifyType.HasComment,
          addCommentDto.entity_type,
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

    const thisEntity = await getEntity(
      getComment.entity_type,
      getComment.entity_id,
      QueryOption.GetOne,
    );

    thisEntity['count_comment'] -= 1;
    if (thisEntity['count_comment'] < 0) thisEntity['count_comment'] = 0;

    try {
      await getManager().transaction(async (transactionManager) => {
        await this.commentRepo.softDelete({
          id: comment_id,
          owner_id: user_id,
        });

        await transactionManager.save(thisEntity);
      });
      return { message: 'ok' };
    } catch (err) {
      throw new Error(err);
    }
  }
}
