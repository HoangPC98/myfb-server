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
import { PrivacyMode } from './privacy.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';

@Entity('posts')
export class Post extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  owner_id!: number;

  @ManyToOne(() => User, (user) => user.Posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  Owner: User;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  privacy_mode: PrivacyMode;

  @Column()
  text: string;

  @Column({ nullable: false, default: 0 })
  count_reaction: number;

  @Column({ nullable: false, default: 0 })
  count_comment: number;

  @OneToMany(() => Photo, (photo) => photo.Post, { cascade: true })
  Photos: Photo[];

  @OneToMany(() => Comment, (comment) => comment.Post, { cascade: true })
  Comments: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.Post, { cascade: true })
  Reactions: Reaction[];
}
