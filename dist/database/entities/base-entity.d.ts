import { BaseEntity } from 'typeorm';
export default abstract class CustomBaseEntity extends BaseEntity {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
