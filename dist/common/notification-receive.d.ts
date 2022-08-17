import CustomBaseEntity from '../database/entities/base-entity';
import { Notifications } from './notification.entity';
export declare class NotificationReceive extends CustomBaseEntity {
    notification_id: number;
    Notification: Notifications;
    user_id: number;
    is_read: boolean;
    is_seen: boolean;
}
