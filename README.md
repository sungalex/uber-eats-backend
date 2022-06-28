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

  - `GraphQLModule` import for root : `forRoot()` static method는 Options Object를 인수로 사용합니다. 이 옵션들은 기본 드라이버 인스턴스(ApolloDriver)로 전달됩니다. 사용 가능한 설정에 대한 자세한 내용은 [Apollo](https://www.apollographql.com/docs/apollo-server/v2/api/apollo-server.html#constructor-options-lt-ApolloServer-gt) 참조.

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

  - https://www.apollographql.com/docs/apollo-server/api/apollo-server

- GraphQL playground

  - GraphQL playground는 브라우저 내 GraphQL IDE 이며, 플레이그라운드에 액세스하려면 기본 GraphQL 서버를 구성([Resolvers](https://docs.nestjs.com/graphql/resolvers-map) 설정)을 완료하고 실행해야 합니다.

  - `http://localhost:3000/graphql`에서 GraphQL 플레이그라운드를 사용할 수 있습니다.
