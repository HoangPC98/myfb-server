import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { Photo } from './photo.entity';
import { Post } from './post.entity';
import { PrivacyMode } from './privacy.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends CustomBaseEntity {
  @PrimaryColumn()
  subject_id!: number;

  @PrimaryColumn()
  user_id!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  User: User;

  @Column()
  text: string;
}
