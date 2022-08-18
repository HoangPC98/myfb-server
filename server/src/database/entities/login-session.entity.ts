import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { User } from './user.entity';

@Entity('login_sessions')
export class LoginSession extends CustomBaseEntity {
  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => User, (user) => user.LoginSessions)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @PrimaryColumn()
  uuid: string;

  @Column({ type: 'varchar', nullable: true })
  fcm_token: string;
}
