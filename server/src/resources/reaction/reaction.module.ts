import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from 'src/database/entities/reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction])],
  controllers: [ReactionController],
  providers: [ReactionService],
})
export class ReactionModule {}
