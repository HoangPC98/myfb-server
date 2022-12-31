import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUID } from 'src/auth/decorators/getUid.derator';
import { EntityType } from 'src/types/enum-types/common.enum';
import { PostReactionDto } from './dto/post-reaction.dto';
import { ReactionService } from './reaction.service';

@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post('new')
  async postReaction(
    @Body() postReactionDto: PostReactionDto,
    @GetCurrentUID() reactor_id: number,
  ) {
    await this.reactionService.postReaction(postReactionDto, reactor_id);
    return {
      response: 'ok',
    };
  }

  @Delete('cancel/:entity_type/:entity_id')
  async cancelReaction(
    @Param('entity_type') entity_type: EntityType,
    @Param('entity_id') entity_id: number,
    @GetCurrentUID() reactor_id: number,
  ) {
    return await this.reactionService.cancelReaction(
      entity_type,
      entity_id,
      reactor_id,
    );
  }
}
