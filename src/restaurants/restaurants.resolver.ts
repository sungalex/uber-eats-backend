/* eslint-disable @typescript-eslint/ban-types */
import { Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

@Resolver()
export class RestaurantResolver {
  @Query(() => Restaurant)
  myRestaurant() {
    return true; // return type error (will to be fixed!!!)
  }
}
