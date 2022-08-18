# 2. Database Configuration

## 2.0 TypeORM and PostgreSQL

- Typescript 또는 NestJS에서 Database와 통신하기 위해 ORM(Object Relational Mapping)이 필요함. ORM을 사용하면 SQL 문을 쓰는 대신 코드를 써서 상호작용 할 수 있음.

- Install PostgreSQL and Postico : https://postgresapp.com

  - Postico는 PostgreSQL를 쉽게 사용할 수 있도록 도와주는 도구

## 2.1 Create Database and User Password

- `Postico`에서 `uber-eats` Database 생성 : DBMS(PostgreSQL)에 Connect 후 `+ DATABASE` 아이콘을 클릭하여 생성

- User Password 변경(생성) : PostgreSQL 윈도우에서 `uber-eats` 데이터베이스를 더블 클릭하면 데이터베이스에 로드인 되며, 데이터베이스에 로그인 된 상태에서 아래 명령으로 패스워드를 변경

  ```psql
  uber-eats=# ALTER USER alex WITH PASSWORD '12345';
  ```

## 2.2 TypeORM Setup

- NestJS and TypeORM Integration (Install the associated client API libraries for your selected database)

  ```zsh
  $ npm install --save @nestjs/typeorm typeorm pg
  ```

- Import the `TypeOrmModule` into the root AppModule (`app.module.ts`)

  ```typescript
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';

  @Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'alex',
        password: '12345',
        database: 'uber-eats',
        entities: [],
        synchronize: true,
        logging: true,
      }),
    ],
  })
  export class AppModule {}
  ```

## 2.3 Configuring ConfigService

- 어플리케이션은 흔히 다른 환경에서 실행되고, 환경에 따라 다른 구성 설정을 사용해야 합니다. Nest에서 이 기술을 사용하는 방법은 `.env` 파일에 설정을 저장하고, `ConfigService`를 노출하는 `ConfigModule`을 만드는 것입니다.

- `.env` 환경을 사용하는 일반적인 방법은 [`dotenv`](https://www.npmjs.com/package/dotenv)를 사용하는 것 입니다. `@nestjs/config` 패키지는 내부적으로 `dotenv`를 사용합니다. ([NestJS > Techniques > Configuration](https://docs.nestjs.com/techniques/configuration))

- 명령 프롬프트에서 동적으로 process.env를 변경하는 것은 Linux와 Mac 환경에서만 작동합니다. Windows 환경에서 해당 코드가 작동하기 위해서는 `cross-env`를 설치해야 한다. [`cross-env`](https://www.npmjs.com/package/cross-env)를 사용하면 플랫폼에 맞게 환경 변수를 설정하지 않고 단일 명령으로 사용할 수 있습니다. (예, `cross-env NODE_ENV=dev nest start --watch`)

- Install Packages:

  ```zsh
  $ npm i --save @nestjs/config
  $ npm i cross-env
  ```

- `package.json`에 동적 환경변수 설정

  ```typescript
  "start": "cross-env NODE_ENV=prod nest start",
  "start:dev": "cross-env NODE_ENV=dev nest start --watch",
  ```

- `app.module.ts` 파일에 `ConfigModule` 생성하고 환경변수 사용하기

  ```ts
  // app.module.ts
  import { ConfigModule } from '@nestjs/config';

  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
        ignoreEnvFile: process.env.NODE_ENV === 'prod',
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
      }),
    ],
  })
  export class AppModule {}
  ```

  - `.env.dev`

  ```
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=alex
  DB_PASSWORD=12345
  DB_NAME=uber-eats
  ```

- `npm run start:dev`로 dev 모드를 시작하면 환경변수가 잘 로드 되는 걸 확인할 수 있습니다.
