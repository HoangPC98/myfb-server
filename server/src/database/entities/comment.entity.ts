import { EntityType } from 'src/types/enum-types/common.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base-entity';
import { Photo } from './photo.entity';
import { Post } from './post.entity';
import { PrivacyMode } from './privacy.entity';
import { Reaction } from './reaction.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entity_id!: number;

  @Column()
  owner_id!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  Owner: User;

  @Column({
    type: 'enum',
    enum: EntityType,
    nullable: false,
  })
  entity_type!: EntityType;

  @Column()
  text: string;

  @ManyToOne(() => Post, (post) => post.Comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entity_id' })
  Post: Post;

  @OneToMany(() => Comment, (comment) => comment.Post, { cascade: true })
  ReplyComments: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.Post, { cascade: true })
  Reactions: Reaction[];

  @Column({ nullable: false, default: 0 })
  count_reaction: number;

  @Column({ nullable: false, default: 0 })
  count_comment: number;
}
