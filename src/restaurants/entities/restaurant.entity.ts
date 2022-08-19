import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Boolean)
  @Column()
  isVigan: boolean;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  ownersName: string;

  @Field(() => String)
  @Column()
  categoryName: string;
}
