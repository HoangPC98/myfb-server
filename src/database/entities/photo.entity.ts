import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base-entity';
import { Post } from './post.entity';

export enum PhotoType {
  Avatar = 'avatar',
  CoverPhoto = 'cover',
  PostPhoto = 'post',
}

@Entity('photos')
export class Photo extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  post_id!: number;

  @ManyToOne(() => Post, (post) => post.Photos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  Post: Post;

  @Column({ type: 'enum', enum: PhotoType, default: null, nullable: true })
  photo_type: PhotoType;

  @Column()
  photo_url: string;
}
