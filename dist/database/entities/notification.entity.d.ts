import { EntityType, NotifyType } from 'src/types/enum-types/common.enum';
import CustomBaseEntity from './base-entity';
import { NotificationReceive } from './notification-receive.entity';
export declare class Notifications extends CustomBaseEntity {
    id: number;
    entity_id: number;
    entity_type: EntityType;
    notify_type: NotifyType;
    data: string;
    NotificationReceives: NotificationReceive[];
}
