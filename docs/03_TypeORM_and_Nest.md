# 3. TypeORM and Nest

## 3.0 Our First TypeORM Entity

- [TypeORM Entity](https://typeorm.io/entities)는 데이터베이스 테이블에 저장되는 데이터의 형태를 정의 합니다. Entity는 데이터베이스 테이블에 매핑 되는 클래스 입니다. `@Entity()` 데코레이터와 함께 class를 정의해서 Entity를 생성할 수 있습니다. TypeORM Entity는 GraphQL ObjectType과 유사 합니다. (`@ObjectType`은 자동으로 스키마를 빌드하기 위해 사용하는 GraphQL 데코레이터 입니다.)

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

## 3.1 Data Mapper vs Active Record

- Data Mapper와 Active Record는 데이터베이스와 상호작용 할 때 사용하는 패턴 입니다.

- [Active Record pattern](https://typeorm.io/active-record-data-mapper#what-is-the-active-record-pattern)

  ```ts
  @Entity()
  export class Restaurant extends BaseEntity {
    // ... 생략
  }
  ```

  ```ts
  const restaurant = new Restaurant();
  restaurant.name = 'alex';
  await restaurant.save();
  ```

  - Active Record 패턴은 모델 내에서 데이터베이스에 액세스하는 접근 방식입니다.

  - Entity class를 생성할 때 BaseEntity를 Extends 해야 합니다.

  - Entity 객체를 생성(예, `const restaurant = new Restaurant()`) 하고, Entity 인스턴스의 컬럼에 값을 할당(`restaurant.name = "alex"`) 한 후 `await restaurant.save()`로 데이터베이스에 값을 저장할 수 있습니다. (BaseEntity에서 상속한 save, find 등 모든 메서드를 사용할 수 있음)

  - Maintainability 측면에서 작은 규모의 Application에 적합합니다.

- [Data Mapper pattern](https://typeorm.io/active-record-data-mapper#what-is-the-data-mapper-pattern)

  ```ts
  const restaurantRepository = dataSource.getRepository(Restaurant);
  const restaurant = new Restaurant();
  restaurant.name = 'alex';
  await restaurantRepository.save(restaurant);
  ```

  - Data Mapper는 모델 대신 Repository 내의 데이터베이스에 액세스하는 접근 방식입니다.

  - Data Mapper 패턴은 Entity와 상호작용을 담당하는 Repository를 사용하여, 데이터베이스와 상호작용 합니다. "Repository"라는 별도의 클래스에서 모든 쿼리 메서드를 정의하고 리포지토리를 사용하여 객체를 저장, 제거 및 로드합니다. (Repository 인스턴스의 메서드를 이용하여 save, find 등 데이터베이스와의 모든 상호작용을 처리 가능)

  - Maintainability 측면에서 Large Application에 적합합니다.

  - Nest는 Data Mapper Pattern을 사용합니다. Nest는 Repository를 사용할 수 있도록 자동으로 class를 준비해주고, `NestJs + TypeORM` 개발 환경에서 Repository를 사용할 수 있습니다.
