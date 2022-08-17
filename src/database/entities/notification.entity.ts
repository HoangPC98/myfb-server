import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { NotificationReceive } from './notification-receive.entity';

export enum EntityType {
  FriendShip = 'FriendShip',
  Reaction = 'Reaction',
  Comment = 'Comment',
}

@Entity('notifications')
export class Notifications extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  entity_id: number;


  @Column({
    type: 'enum',
    enum: EntityType,
    default: null,
    nullable: true,
  })
  type_entity: EntityType;

  @Column({ type: 'text' })
  data: string;

  @OneToMany(
    () => NotificationReceive,
    (notificationReceive) => notificationReceive.Notification,
    { cascade: true },
  )
  NotificationReceives: NotificationReceive[];
}
