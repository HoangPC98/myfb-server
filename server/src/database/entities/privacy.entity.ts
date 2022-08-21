import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { User } from './user.entity';

export enum PrivacyMode {
  Public = 'public',
  Friend = 'friend',
  Private = 'private',
  All = 'all',
}

@Entity('privacy')
export class Privacy extends CustomBaseEntity {
  @PrimaryColumn()
  user_id: number;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  view_post: PrivacyMode;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  comment_post: PrivacyMode;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  share_post: PrivacyMode;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  reaction_post: PrivacyMode;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  view_friendship: PrivacyMode;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  view_photo: PrivacyMode;

  @Column({
    type: 'enum',
    enum: PrivacyMode,
    default: PrivacyMode.Public,
    nullable: true,
  })
  view_profile: PrivacyMode;

  @OneToOne(() => User, (user: User) => user.Privacy)
  User: User;
}
