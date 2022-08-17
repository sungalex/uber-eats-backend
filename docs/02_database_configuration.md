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
