import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import CustomBaseEntity from 'src/database/entities/base-entity';
import { Notifications } from 'src/database/entities/notification.entity';
import { User } from 'src/database/entities/user.entity';

@Entity('notification_receives')
export class NotificationReceive extends CustomBaseEntity {
  @PrimaryColumn()
  notification_id: number;

  @ManyToOne(
    () => Notifications,
    (notification) => notification.NotificationReceives,
  )
  @JoinColumn({ name: 'notification_id' })
  Notification: Notifications;

  @PrimaryColumn()
  user_id: number;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @Column({ type: 'boolean', default: false })
  is_seen: boolean;

  @ManyToOne(() => User, (user: User) => user.NotificationReceives)
  @JoinColumn({ name: 'user_id' })
  User: User;
}
