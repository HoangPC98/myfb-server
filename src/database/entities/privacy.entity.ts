import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { User } from './user.entity';

export enum PrivacyMode {
  Public = 'public',
  Friend = 'friend',
  Private = 'private',
}

@Entity('privacy')
export class Privacy extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  view_post: Privacy;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  comment_post!: Privacy;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  share_post!: Privacy;

  @OneToOne(() => User, (user: User) => user.Privacy)
  User: User;
}
