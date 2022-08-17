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

@Entity('posts')
export class Post extends CustomBaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  owner_id!: number;

  @ManyToOne(() => User, (user) => user.Posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  Owner: User;

  @Column({ type: 'enum', enum: PrivacyMode, default: null, nullable: true })
  privacy_mode: PrivacyMode;

  @Column()
  text: string;

  @OneToMany(() => Photo, (photo) => photo.Post, { cascade: true })
  Photos: Photo[];
}
