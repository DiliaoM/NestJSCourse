import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { CoffeesController } from './coffees.controller';

@Module({
  imports: [CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
// controllers: which you can think of as our API Routes, that we want this module to instantiate.
// exports: Here we can list providers within this current module that should be made available anywhere this module is imported
// imports: just as we saw in the AppModule, the imports Array gives us the ability to list OTHER modules that This module requires. Any exported providers of these imported modules are now fuly available here as well.
// providers: Here we’re going to list our services that need to be instantiated by the Nest injector.  Any providers here will be available only within “THIS” module itself, unless added to the exports array we saw above.
export class CoffeesModule {}
