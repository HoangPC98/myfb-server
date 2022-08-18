import { EntityType } from 'src/types/enum-types/common.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base-entity';
import { Photo } from './photo.entity';
import { Post } from './post.entity';
import { PrivacyMode } from './privacy.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entity_id!: number;

  @Column()
  user_id!: number;

  @Column({
    type: 'enum',
    enum: EntityType,
    nullable: false,
  })
  entity_type!: EntityType;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  User: User;

  @Column()
  text: string;

  @ManyToOne(() => Post, (post) => post.Comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entity_id' })
  Post: Post;
}
