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
import { User } from './user.entity';

export enum ReactionType {
  Like = 'like',
  Love = 'love',
  Haha = 'haha',
  Sad = 'Sad',
  Angry = 'Angry',
}

@Entity('reactions')
export class Reaction extends CustomBaseEntity {
  @PrimaryColumn()
  subject_id!: number;

  @PrimaryColumn()
  user_id!: number;

  @ManyToOne(() => User, (user) => user.Posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  User: User;

  @Column({
    type: 'enum',
    enum: ReactionType,
    default: ReactionType.Like,
    nullable: true,
  })
  reaction_type: ReactionType;
}
