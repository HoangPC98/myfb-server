import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class CustomBaseEntity extends BaseEntity {
  @CreateDateColumn({
    nullable: false,
    precision: 6,
  })
  createdAt?: Date = new Date();

  @UpdateDateColumn({
    nullable: false,
    precision: 6,
  })
  updatedAt?: Date = new Date();

  @DeleteDateColumn({
    nullable: true,
    precision: 6,
  })
  deletedAt?: Date;
}
