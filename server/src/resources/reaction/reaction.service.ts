import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/database/entities/reaction.entity';
import {
  EntityType,
  NotifyType,
  QueryOption,
} from 'src/types/enum-types/common.enum';
import { getManager, Repository } from 'typeorm';
import { PostReactionDto } from './dto/post-reaction.dto';
import { NotificationService } from '../notification/notification.service';
import console from 'console';
import { Post } from 'src/database/entities/post.entity';
import { Comment } from 'src/database/entities/comment.entity';
import { Photo } from 'src/database/entities/photo.entity';
import { getEntity } from 'src/repository/common.repository';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepo: Repository<Reaction>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Photo)
    private readonly photoRepo: Repository<Photo>,
    private readonly notificationService: NotificationService,
  ) {}

  private readonly notFoundEntityErrorMsg = 'Entity not found';

  async postReaction(postReactionDto: PostReactionDto, uid: number) {
    const entityName = postReactionDto.entity_type;
    const id_column = entityName === EntityType.Post ? 'id' : 'entity_id';

    let repoObject: Repository<any>;
    if (entityName === EntityType.Post) repoObject = this.postRepo;
    else if (entityName === EntityType.Comment) repoObject = this.commentRepo;
    else if (entityName === EntityType.Photo) repoObject = this.photoRepo;

    const thisEntity = await repoObject.findOne({
      where: { id: postReactionDto.entity_id },
    });

    if (!thisEntity) throw new BadRequestException(this.notFoundEntityErrorMsg);

    const checkReactedBefore = await this.reactionRepo.findOne({
      entity_id: postReactionDto.entity_id,
      entity_type: postReactionDto.entity_type,
      owner_id: uid,
    });

    console.log('checkRaactedBefore', thisEntity);

    if (checkReactedBefore !== undefined) {
      checkReactedBefore.reaction_type = postReactionDto.react_option;
      return await this.reactionRepo.save(checkReactedBefore);
    }
    const newReaction = new Reaction();
    newReaction.reaction_type = postReactionDto.react_option;
    newReaction.entity_id = postReactionDto.entity_id;
    newReaction.owner_id = uid;
    newReaction.entity_type = entityName;

    console.log('newnew', newReaction);

    thisEntity['count_reaction'] += 1;

    console.log('count>>>', thisEntity);

    await getManager().transaction(async (transactionManager) => {
      await transactionManager.save(newReaction);

      await transactionManager.save(thisEntity);
    });

    if (uid === thisEntity.owner_id) return;

    // push notification Reactions
    let pre_process_msg = '';
    const reactionCount = thisEntity.count_reaction;
    console.log('reactionCount', reactionCount);
    if (reactionCount === 1 || undefined) {
      pre_process_msg = `$username has express reaction about your ${entityName}`;
    } else
      pre_process_msg = `$username and ${reactionCount} others has express reaction about your ${entityName}`;
    console.log('pre_process_msg...', pre_process_msg);
    await this.notificationService.sendNotificationFromOneToOne(
      uid,
      thisEntity['owner_id'],
      thisEntity['id'],
      NotifyType.HasReact,
      EntityType.Reaction,
      pre_process_msg,
    );
    return {
      message: 'ok',
    };
  }

  async cancelReaction(
    entity_type: EntityType,
    entity_id: number,
    reactor_id: number,
  ) {
    try {
      const thisEntity = await getEntity(
        entity_type,
        entity_id,
        QueryOption.GetOne,
      );
      thisEntity['count_reaction'] -= 1;

      await getManager().transaction(async (transactionManager) => {
        await transactionManager.softDelete(Reaction, {
          entity_type: entity_type,
          entity_id: entity_id,
          owner_id: reactor_id,
        });
        await transactionManager.save(thisEntity);

        return { message: 'ok' };
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
