# 3. TypeORM and Nest

- [Entity](https://typeorm.io/entities)는 데이터베이스 테이블에 저장되는 데이터의 형태를 정의 합니다. Entity는 데이터베이스 테이블에 매핑 되는 클래스 입니다. `@Entity()` 데코레이터와 함께 class를 정의해서 Entity를 생성할 수 있습니다. TypeORM Entity는 GraphQL ObjectType과 유사 합니다. (`@ObjectType`은 자동으로 스키마를 빌드하기 위해 사용하는 GraphQL 데코레이터 입니다.)

- 하나의 클래스에 GraphQL 데코레이터인 @ObjectType()과 TypeORM 데코레이터인 @Entity()을 동시에 지정할 수 있습니다.

- 필드에는 @Field()에 @Column() 데코레이터를 동시에 지정 합니다. Entity에는 하나의 Primary Column(@PrimaryGeneratedColumn() or @PrimaryColumn())을 지정해야 합니다.

- `TypeOrmModule` Options에 Entity List를 추가하고 `synchronize: true`로 설정하면 Entity에 정의한 스키마가 데이터베이스에 자동으로 생성 됩니다.

  - `app.module.ts`

  ```ts
  // ... 생략
  TypeOrmModule.forRoot({
      // ... 생략
      entities: [Restaurant],
      synchronize: true,
  }),
  ```

  - postico 도구에서 restaurant 테이블이 자동으로 생성된 것을 확인할 수 있습니다.

  - Production 환경에서는 `synchronize: flase`로 설정해야 합니다. 아래와 같이 설정하는 것이 바람직 합니다.

  ```ts
  // ... 생략
  TypeOrmModule.forRoot({
      // ... 생략
      synchronize: process.env.NODE_ENV !== 'prod',
  }),
  ```
