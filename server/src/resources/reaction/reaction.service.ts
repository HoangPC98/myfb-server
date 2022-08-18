import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/database/entities/reaction.entity';
import { EntityType, NotifyType } from 'src/types/enum-types/common.enum';
import { getManager, Repository } from 'typeorm';
import { PostReactionDto } from './dto/post-reaction.dto';
import { NotificationService } from '../notification/notification.service';
import console from 'console';
import { Post } from 'src/database/entities/post.entity';
import { Comment } from 'src/database/entities/comment.entity';
import { Photo } from 'src/database/entities/photo.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
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
      relations: ['Reactions'],
    });

    if (!thisEntity) throw new BadRequestException(this.notFoundEntityErrorMsg);

    const checkReactedBefore = await this.reactionRepository.findOne({
      entity_id: postReactionDto.entity_id,
      entity_type: postReactionDto.entity_type,
      owner_id: uid,
    });

    if (checkReactedBefore !== undefined) {
      checkReactedBefore.reaction_type = postReactionDto.react_option;
      return await this.reactionRepository.save(checkReactedBefore);
    }
    const newReaction = new Reaction();
    newReaction.reaction_type = postReactionDto.react_option;
    newReaction.entity_id = postReactionDto.entity_id;
    newReaction.owner_id = uid;
    newReaction.entity_type = entityName;

    await this.reactionRepository.save(newReaction);

    if (uid === thisEntity.owner_id) return;

    // push notification Reactions
    let pre_process_msg = '';
    const reactionCount = thisEntity.Reactions.length;
    console.log('reactionCount', reactionCount);
    if (reactionCount === 0 || undefined) {
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
    await this.reactionRepository.delete({
      entity_type: entity_type,
      entity_id: entity_id,
      owner_id: reactor_id,
    });
    return;
  }
}
