# Uber Eats Clone Coding

The Backend of Uber Eats Clone with NestJS, Jest, GraphQL, TypeORM, React and Typescript

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Creating Application

- [Nest CLI](https://docs.nestjs.com/cli/overview)를 사용하여 새 프로젝트를 생성합니다.

```bash
$ nest g application uber-eats-backend
```

## Installation

```bash
$ cd uber-eats-backend
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## git

```bash
$ git init
$ git remote add origin https://github.com/sungalex/uber-eats-backend.git
```

- Visual Studio Code에 gitignore(CodeZombie) 패키지를 설치하면, 명령팔레트(Shift + Command + P)에서 `add gitignore` 명령으로 프로그램/프레임워크에 맞는 `.gitignore` 파일을 자동 생성할 수 있음

## GraphQL API

- [GraphQL](https://docs.nestjs.com/graphql/quick-start) 설치

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

- Resolvers, GraphQL Schema

  - Query(gql) --> Resolvers --> GraphQL Schema

  - GraphQL 스키마를 생성하는 방법은 `Code First`와 `Schema First`가 있습니다.

  - `Code First` 접근 방식

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
