import CustomBaseEntity from 'src/database/entities/base-entity';
import { Notifications } from 'src/database/entities/notification.entity';
import { User } from 'src/database/entities/user.entity';
export declare class NotificationReceive extends CustomBaseEntity {
    notification_id: number;
    Notification: Notifications;
    user_id: number;
    is_read: boolean;
    is_seen: boolean;
    User: User;
}
