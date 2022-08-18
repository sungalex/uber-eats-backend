import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateRestaurantDto {
  @Field(() => String)
  name: string;
  @Field(() => Boolean)
  isVigan: boolean;
  @Field(() => String)
  address: string;
  @Field(() => String)
  ownersName: string;
}
