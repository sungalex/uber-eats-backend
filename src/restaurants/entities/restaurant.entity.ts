import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field(() => String)
  name: string;
  @Field(() => Boolean)
  isVigan: boolean;
  @Field(() => String)
  address: string;
  @Field(() => String)
  ownersName: string;
}
