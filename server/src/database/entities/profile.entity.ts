import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @PrimaryGeneratedColumn()
  user_id: number;

  @OneToOne(() => User, (user) => user.Profile) // specify inverse side as a second parameter
  User: User

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


}
