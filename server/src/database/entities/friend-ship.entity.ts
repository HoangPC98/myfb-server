import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base-entity';
import { User } from './user.entity';

export enum FriendShipStatus {
  Pending = 'pending',
  BeFriended = 'beFriended',
  Blocked = 'blocked',
  RejectFriend = 'rejectFriend',
}

@Entity('friend_ships')
export class FriendShip extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender_uid: number;

  @Column()
  receiver_uid: number;

  @Column({
    type: 'enum',
    enum: FriendShipStatus,
    default: 'pending',
    nullable: true,
  })
  friendship_status: FriendShipStatus;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_uid' })
  Sender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver_uid' })
  Receiver: User;
}
