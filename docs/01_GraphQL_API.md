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
