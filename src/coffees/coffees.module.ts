import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
// import { Connection } from 'typeorm';

// class MockCoffeesService {}
// id-1:
// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}
// id-2:
// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     /* ... DO SOMETHING ... */
//     return ['buddy brew', 'nescafe'];
//   }
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    // CoffeeBrandsFactory,
    // {
    //   provide: COFFEE_BRANDS,
    //   // useValue: ['buddy brew', 'nescafe'], // String-valued token
    //   useFactory: () => ['buddy brew', 'nescafe'], // The actual provider will be supplied by the value returned from a factory function.
    //   // scope: Scope.TRANSIENT,
    //   // id-3:
    //   // useFactory: async (connection: Connection): Promise<string[]> => {
    //   //   // const coffeeBrands = await connection.query('SELECT * ...');
    //   //   const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
    //   //   return coffeeBrands;
    //   // },
    //   // inject: [Connection],
    //   // id-2:
    //   // useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //   //   brandsFactory.create(),
    //   // inject: [CoffeeBrandsFactory],
    // },
    // id-1:
    // {
    //   provide: CoffeesService,
    //   // useClass: CoffeesService,
    //   useValue: new MockCoffeesService(), //The useValue syntax is useful for injecting a constant value, putting an external library into the Nest container, or replacing a real implementation with a mock object.
    // },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
  ],
  exports: [CoffeesService],
})
// controllers: which you can think of as our API Routes, that we want this module to instantiate.
// exports: Here we can list providers within this current module that should be made available anywhere this module is imported
// imports: just as we saw in the AppModule, the imports Array gives us the ability to list OTHER modules that This module requires. Any exported providers of these imported modules are now fuly available here as well.
// providers: Here we’re going to list our services that need to be instantiated by the Nest injector.  Any providers here will be available only within “THIS” module itself, unless added to the exports array we saw above.
export class CoffeesModule {}
