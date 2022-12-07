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
import { UserSession } from './user-session.entity';
import { NotificationReceive } from 'src/database/entities/notification-receive.entity';
// import { NotificationReceive } from './notification-receive';
import { Post } from './post.entity';
import { Privacy } from './privacy.entity';
import { Profile } from './profile.entity';
import { Photo } from './photo.entity';
import { DEFAULT_AVATAR_URL } from 'src/constants/common.constant';

import { AuthType, UserStatus, Gender } from 'src/types/enum-types/common.enum';

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

  @Column({
    type: 'enum',
    enum: AuthType,
    default: AuthType.UsernamePasswordAuth,
    nullable: false,
  })
  auth_type: AuthType;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  given_name: string;

  @Column({ type: 'enum', enum: Gender, default: null, nullable: true })
  gender: Gender;

  @Column({ nullable: true, default: DEFAULT_AVATAR_URL })
  avatar_url: string;

  @Column()
  cover_photo_url: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({unique: true, nullable: true })
  phone_number: string;

  @Column()
  password: string;

  @Column({unique: true })
  secret: string;

  @OneToOne(() => Profile, (profile) => profile.User) // specify inverse side as a second parameter
  @JoinColumn()
  Profile: Profile

  @OneToOne(() => Privacy)
  @JoinColumn()
  Privacy: Privacy;

  @OneToMany(() => Post, (post) => post.Owner, { cascade: true })
  Posts: Post[];

  @OneToMany(() => Photo, (photo) => photo.Owner, { cascade: true })
  Photos: Photo[];

  @OneToMany(() => UserSession, (loginSession) => loginSession.User)
  UserSessions: UserSession[];

  @OneToMany(
    () => NotificationReceive,
    (notificationReceive: NotificationReceive) => notificationReceive.User,
  )
  NotificationReceives: NotificationReceive[];
}
