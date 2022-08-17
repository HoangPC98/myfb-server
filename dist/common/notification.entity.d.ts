import CustomBaseEntity from '../database/entities/base-entity';
import { NotificationReceive } from './notification-receive';
export declare enum EntityType {
    FriendShip = "FriendShip",
    Reaction = "Reaction",
    Comment = "Comment"
}
export declare class Notifications extends CustomBaseEntity {
    id: number;
    entity_id: number;
    type_entity: EntityType;
    data: string;
    NotificationReceives: NotificationReceive[];
}
