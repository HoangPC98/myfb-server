import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base-entity';
import { FriendShip } from './friend-ship.entity';
import { LoginSession } from './login-session.entity';
import { NotificationReceive } from 'src/database/entities/notification-receive.entity';
// import { NotificationReceive } from './notification-receive';
import { Post } from './post.entity';
import { Privacy } from './privacy.entity';
import { Profile } from './profile.entity';
import { Photo } from './photo.entity';
import { DEFAULT_AVATAR_URL } from 'src/constants/common.constant';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Locked = 'locked',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

@Entity('users')
export class User extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
    nullable: true,
  })
  user_status: UserStatus;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  given_name: string;

  @Column({ type: 'enum', enum: Gender, default: null, nullable: true })
  gender: Gender;

  @Column({ nullable: false, default: DEFAULT_AVATAR_URL })
  avatar_url: string;

  @Column()
  cover_photo_url: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  Profile: Profile;

  @OneToOne(() => Privacy)
  @JoinColumn()
  Privacy: Privacy;

  @OneToMany(() => Post, (post) => post.Owner, { cascade: true })
  Posts: Post[];

  @OneToMany(() => Photo, (photo) => photo.Owner, { cascade: true })
  Photos: Photo[];

  @OneToMany(() => LoginSession, (loginSession) => loginSession.User)
  LoginSessions: LoginSession[];

  @OneToMany(
    () => NotificationReceive,
    (notificationReceive: NotificationReceive) => notificationReceive.User,
  )
  NotificationReceives: NotificationReceive[];
}
