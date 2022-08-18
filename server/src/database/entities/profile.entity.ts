import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import CustomBaseEntity from './base-entity';
import { Post } from './post.entity';
import { User } from './user.entity';

export enum RelationshipStatus {
  Signle = 'single',
  Dating = 'dating',
  Married = 'married',
}

@Entity('profiles')
export class Profile extends CustomBaseEntity {
  @PrimaryColumn()
  user_id: number;

  @OneToOne(() => User, (user) => user.Profile)
  user: User;

  @Column()
  bio: string;

  @Column()
  dob: string;

  @Column()
  phone_number: string;

  @Column()
  come_from: string;

  @Column()
  work_place: string;

  @Column({
    type: 'enum',
    enum: RelationshipStatus,
    default: null,
    nullable: true,
  })
  relationship_status: RelationshipStatus;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Post, (post) => post.Owner, { cascade: true })
  Posts: Post[];
}
