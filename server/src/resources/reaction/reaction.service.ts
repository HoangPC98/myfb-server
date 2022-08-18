import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/database/entities/reaction.entity';
import { EntityType } from 'src/types/enum-types/common.enum';
import { getManager, Repository } from 'typeorm';
import { PostReactionDto } from './dto/post-reaction.dto';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
  ) {}

  private readonly notFoundEntityErrorMsg = 'Entity not found';

  async postReaction(postReactionDto: PostReactionDto, reactor_id: number) {
    const entityName = postReactionDto.entity_type;
    const id_column = entityName === EntityType.Post ? 'id' : 'entity_id';
    const entityRec = await getManager()
      .createQueryBuilder(entityName, entityName)
      .where(`${id_column} = :entity_id`, {
        entity_id: postReactionDto.entity_id,
      })
      .getOne();
    console.log('entyty rec...', entityRec);

    if (!entityRec) throw new BadRequestException(this.notFoundEntityErrorMsg);

    const checkReactedBefore = await this.reactionRepository.findOne({
      entity_id: postReactionDto.entity_id,
      entity_type: postReactionDto.entity_type,
      reactor_id: reactor_id,
    });

    if (checkReactedBefore !== undefined) {
      checkReactedBefore.reaction_type = postReactionDto.react_option;
      return await this.reactionRepository.save(checkReactedBefore);
    }
    const newReaction = new Reaction();
    newReaction.reaction_type = postReactionDto.react_option;
    newReaction.entity_id = postReactionDto.entity_id;
    newReaction.reactor_id = reactor_id;
    newReaction.entity_type = postReactionDto.entity_type;

    await this.reactionRepository.save(newReaction);
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
      reactor_id: reactor_id,
    });
    return;
  }
}
