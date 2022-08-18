import { EntityType, NotifyType } from 'src/types/enum-types/common.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { NotificationReceive } from './notification-receive.entity';

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
  entity_type: EntityType;

  @Column({
    type: 'enum',
    enum: NotifyType,
    default: null,
    nullable: true,
  })
  notify_type: NotifyType;

  @Column({ type: 'text' })
  data: string;

  @OneToMany(
    () => NotificationReceive,
    (notificationReceive) => notificationReceive.Notification,
    { cascade: true },
  )
  NotificationReceives: NotificationReceive[];
}
