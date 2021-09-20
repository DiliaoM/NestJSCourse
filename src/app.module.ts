import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres', // type of our database
        host: process.env.DATABASE_HOST, // database host
        port: +process.env.DATABASE_PORT, // database port
        username: process.env.DATABASE_USER, // username
        password: process.env.DATABASE_PASSWORD, // user password
        database: process.env.DATABASE_NAME, // name of our database,
        autoLoadEntities: true, // models will be loaded automatically
        synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      // id-2:
      // envFilePath: '.environment', // In this example, we’re looking instead for a .environment file.
      // ignoreEnvFile: true, // Have ConfigModule *ignore* .env files
      // id-1:
      // validationSchema: Joi.object({
      //   DATABASE_HOST: Joi.required(),
      //   DATABASE_PORT: Joi.number().default(5432),
      // }),
    }),
    CoffeesModule,

    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
