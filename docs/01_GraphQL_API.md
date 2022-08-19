# 1. GraphQL API

## 1.0 [GraphQL](https://docs.nestjs.com/graphql/quick-start) 설치

```bash
# For Express and Apollo (default)
$ npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

- `app.controller`, `app.service` 모듈 삭제 (서비스별 Module을 만들어서 `app.module`에 import)

- [Getting started with GraphQL & TypeScript](https://docs.nestjs.com/graphql/quick-start#getting-started-with-graphql--typescript)

- Apollo Server Setup

  - import `GraphQLModule` for root : `forRoot()` static method는 Options Object를 인수로 사용합니다. 이 옵션들은 기본 드라이버 인스턴스(ApolloDriver)로 전달됩니다. 사용 가능한 설정에 대한 자세한 내용은 [Apollo](https://www.apollographql.com/docs/apollo-server/v2/api/apollo-server.html#constructor-options-lt-ApolloServer-gt) 참조.

  - 아래 코드는 playground 모드를 활성화 하고, debug 모드를 비활성화 하는 예 입니다.

  ```ts
  // app.module.ts
  import { Module } from '@nestjs/common';
  import { GraphQLModule } from '@nestjs/graphql';
  import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

  @Module({
    imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        debug: false,
        playground: true,
      }),
    ],
    controllers: [],
    providers: [],
  })
  export class AppModule {}
  ```

## 1.1 Our First Resolver

- Resolvers, GraphQL Schema

  - Query(gql) --> Resolvers --> GraphQL Schema

  - SDL(Schema Definition Language) : 스키마 정의 언어

  - GraphQL specification은 스키마를 정의하고 문자열로 저장하는 데 사용하는 사람이 읽을 수 있는 스키마 정의 언어(또는 SDL)를 정의합니다.

  - `gql`은 SDL로 작성된 GraphQL Qurey 문 입니다.

  - GraphQL 스키마를 생성하는 방법은 `Code First`와 `Schema First`가 있습니다.

- `Code First` 접근 방식 (여기서는 이 방식을 사용합니다.)

  - 데코레이터와 TypeScript 클래스를 사용하여 해당 GraphQL 스키마를 생성합니다.

  - `autoSchemaFile` options 객체에 속성을 추가합니다. `autoSchemaFile` 속성 값은 자동으로 생성된 스키마가 생성될 경로입니다.

    ```ts
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ```

  - 또는 메모리에서 즉석에서 스키마를 생성할 수 있습니다. 이를 활성화하려면 `autoSchemaFile` 속성을 `true`로 설정합니다.

    ```ts
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ```

- `Schema First` 접근 방식

  - `typePaths` 옵션 객체에 속성을 추가합니다. `typePaths` 속성은 `GraphQLModule`이 GraphQL SDL 스키마 정의 파일을 찾을 위치를 나타 냅니다. 이러한 파일들은 메모리에서 결합 됩니다. 이를 통해 스키마를 여러 파일로 분할하여 해당 Resolvers 근처에 파일들을 위치 시킬 수 있게 합니다.

    ```ts
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    ```

- first Resolvers(RestaurantResolver) 만들기

  - `restaurants` module 생성 : `app.module`에 자동으로 import 됨

    ```bash
    $ nest g mo restaurants
    ```

  - `restaurants.resolver.ts` 만들기 (`@Resolver()` 데코레이터를 가지는 Typescript class `RestaurantResolver` 만들기)

    - `RestaurantResolver` class에 `@Query()` 데코레이터를 가지는 함수 작성하기. 이 함수는 `@Query()`의 typeFunc 함수가 리턴하는 type과 같은 type을 return 해야 함

    - `@Query()`는 typeFunc을 인자로 가짐. typeFunc(ReturnTypeFunction)은 Query가 return 하고자 하는 type을 return 하는 function 임

    - 예로, `@Query(() => Boolean)`에서 @Query()`의 인자는 Boolean을 리턴하는 함수이며, isPizzaGood() 함수는 Boolean을 return 함

      ```ts
      @Resolver()
      export class RestaurantResolver() {
        @Query(() => Boolean)
        isPizzaGood() {
          return true;
        }
      }
      ```

  - `restaurants.module`의 provider에 `RestaurantResolver` 추가 하기

- GraphQL playground

  - GraphQL playground는 브라우저 내 GraphQL IDE 이며, 플레이그라운드에 액세스하려면 기본 GraphQL 서버를 구성([Resolvers](https://docs.nestjs.com/graphql/resolvers-map) 설정)을 완료하고 실행해야 합니다.

  - `http://localhost:3000/graphql`에서 GraphQL 플레이그라운드를 사용할 수 있습니다.

## 1.2 [ObjectType](https://docs.nestjs.com/graphql/resolvers#object-types)

- GraphQL 스키마의 대부분의 정의는 object types 입니다. 정의하는 각 object type은 응용 프로그램 클라이언트가 상호 작용해야 하는 도메인 객체를 나타내야 합니다.

- `the code first approach`를 사용한다면, `@ObjectType() ` 데코레이터와 함께 TypeScript 클래스를 사용하여 스키마를 정의하고, TypeScript 데코레이터(GraphQL 데코레이터, `@Field`)를 사용하여 해당 클래스의 field에 주석을 추가합니다.

  - `src/restaurant/entities/restaurant.entity.ts`

    ```ts
    import { Field, ObjectType } from '@nestjs/graphql';

    @ObjectType()
    export class Restaurant {
      @Field(() => String)
      name: string;

      @Field(() => Boolean)
      isGood?: boolean;
    }
    ```

## 1.3 [Arguments](https://docs.nestjs.com/graphql/resolvers#args-decorator-options)

- 메서드 핸들러에서 사용할 인수를 Request에서 추출하기 위해 `@Args()` 데코레이터를 사용 합니다. REST request 파라미터에서 인수를 추출하는 것과 매우 유사한 방식으로 작동합니다.

  ```ts
  @Resolver(() => Restaurant)
  export class RestaurantResolver {
    @Query(() => [Restaurant])
    restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
      console.log(veganOnly);
      return [];
    }
  }
  ```

- Playground에서 아래와 같이 확인할 수 있습니다.

  ![playground_restaurants](imgs/playground_restaurants.png)

## 1.4 ArgsType and InputType

- 데이타베이스에 쓰기를 유발하는 모든 작업은 Mutation을 명시적으로 보내야 한다는 Convention을 준수하는 것이 좋습니다. Nest에서는 `@Mutation()` 데코레이터를 사용합니다.

- 모든 데코러이터(@Resolver, @ResolveField, @Args, etc.)는 `@nestjs/graphql` 패키지로 부터 Export 됩니다.

- Mutation 매서드를 생성할 때 인수를 하나 하나 개별적으로 선언해도 되지만, Mutation이 객체를 인수로 가져야 하는 경우 Input Type을 생성해서 객체를 통째로 인수로 전달할 할 수도 있습니다. Input Type은 인수로 전달할 수 있는 특수한 유형의 Object Type 입니다. Input Type을 선언하려면 `@InputType()` 데코레이터를 사용하십시오.

- @InputType() 사용하기

  - `create-restaurant.dto.ts`에 Input Type 생성하기

    ```ts
    import { Field, InputType } from '@nestjs/graphql';

    @InputType()
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
    ```

  - `restaurants.resolver.ts` 파일에 `createRestaurant()` Mutation method 생성하기 (@Args에 인수명을 포함해야 합니다.)

    ```ts
    @Mutation(() => Boolean)
    createRestaurant(
      @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantDto,
    ): boolean {
      console.log(createRestaurantInput);
      return true;
    }
    ```

  - Playground에서 확인하기 (변수명에 객체를 할당해서 인수로 전달해야 합니다.)

    ```gql
    mutation {
      createRestaurant(
        createRestaurantInput: {
          name: "Nest"
          isVigan: false
          address: "seoul"
          ownersName: "alex"
        }
      )
    }
    ```

- `@ArgsType()` 사용하기 (이 프로젝트에서는 이 방법을 사용 합니다.)

  - @InputType() 대신 @ArgsType()을 사용하면 DTO에 선언한 각각의 필드를 분리된 Arguments로 사용할 수 있게 합니다.

  - `create-restaurant.dto.ts`에 `@InputType()`을 `@ArgsType()`으로 변경하고, 아래와 같이 `restaurants.resolver.ts` 파일에 `createRestaurant()` Mutation method의 `@Args` 인수명을 제거 합니다.

    ```ts
    @Mutation(() => Boolean)
    createRestaurant(
      @Args() createRestaurantDto: CreateRestaurantDto,
    ): boolean {
      console.log(createRestaurantDto);
      return true;
    }
    ```

  - Playground에서 확인하기 (각각의 필드에 값을 할당해서 인수로 전달 합니다.)

    ```gql
    mutation {
      createRestaurant(
        name: "Nest"
        isVigan: false
        address: "seoul"
        ownersName: "alex"
      )
    }
    ```

## 1.5 Validating ConfigService

- DTO(@ArgsType)에도 class validator를 사용할 수 있습니다. class-validator와 class-transformer를 설치 합니다.

  ```zsh
  $ npm i class-validator class-transformer
  ```

- DTO(`create-restaurant.dto.ts`)에 유효성 검사 데코레이터 추가하기 (Validation Pipeline을 추가해야 유효성 검사가 동작함)

  ```ts
  import { ArgsType, Field } from '@nestjs/graphql';
  import { IsBoolean, IsString, Length } from 'class-validator';

  @ArgsType()
  export class CreateRestaurantDto {
    @Field(() => String)
    @IsString()
    @Length(5, 10)
    name: string;

    @Field(() => Boolean)
    @IsBoolean()
    isVigan: boolean;

    // ...
  }
  ```

- Validation Pipeline 추가하기 (아래 코드를 `main.ts`에 추가)

  ```ts
  app.useGlobalPipes(new ValidationPipe());
  ```

- Playground에서 인수 타입 및 Length 제약사항 유효성 검사가 정상 작동하는지 확인할 수 있습니다.
