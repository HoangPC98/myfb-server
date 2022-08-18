import { EntityType, ReactionType } from 'src/types/enum-types/common.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('reactions')
export class Reaction extends CustomBaseEntity {
  @PrimaryColumn()
  entity_id!: number;

  @PrimaryColumn()
  owner_id!: number;

  @ManyToOne(() => User, (user) => user.Posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  Owner: User;

  @Column({
    type: 'enum',
    enum: EntityType,
    nullable: false,
  })
  entity_type!: EntityType;

  @Column({
    type: 'enum',
    enum: ReactionType,
    default: ReactionType.Like,
    nullable: true,
  })
  reaction_type: ReactionType;

  @ManyToOne(() => Post, (post) => post.Reactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entity_id' })
  Post: Post;
}
