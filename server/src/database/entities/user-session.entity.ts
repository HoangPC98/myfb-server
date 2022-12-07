import { OtpType } from 'src/types/enum-types/common.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { User } from './user.entity';

@Entity('user_sessions')
export class UserSession extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.UserSessions)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @Column({nullable: true})
  user_id: number;

  @Column({})
  email_or_phone: string;

  @Column({
    type: 'enum',
    enum: OtpType,
    nullable: false,
    default: OtpType.VerifyEmailOrPhone
  })
  session_type: string;

  @Column({nullable: true})
  flag: number;

  @Column()
  uuid: string;

  @Column({nullable: true})
  user_agent: string;

  @Column({ type: 'varchar', nullable: true })
  token: string;
}
