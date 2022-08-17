import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { User } from './user.entity';

export enum FriendShipStatus {
  Pending = 'pending',
  BeFriended = 'beFriended',
  Blocked = 'blocked',
}

@Entity('friend_ships')
export class FriendShip extends CustomBaseEntity {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  sender_uid: number;

  @PrimaryColumn()
  receiver_uid: number;

  @ManyToOne(() => User, (user: User) => user.FriendShip)
  @JoinColumn({ name: 'id' })
  User: User;

  @Column({
    type: 'enum',
    enum: FriendShipStatus,
    default: 'pending',
    nullable: true,
  })
  status: FriendShipStatus;
}
