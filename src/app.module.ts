import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './models/todo/todo.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// The @Module decorator defines a module in NestJS.
// A module is a class annotated with a @Module() decorator, which provides metadata that NestJS uses to organize the application structure.
@Module({
  // The imports array allows you to import other modules into this module.
  // Here, we are importing the MongooseModule and configuring it to connect to a MongoDB database.
  // We are also importing the TodoModule which contains the logic for the Todo feature.
  imports: [
    // ConfigModule.forRoot() is used to configure the environment variables.
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration module global
      envFilePath: '.env', // Path to the .env file
    }),
    // MongooseModule.forRootAsync() is used to configure the connection to the MongoDB database using ConfigService.
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // Importing the TodoModule which contains the Todo feature.
    TodoModule,
  ],
  // The controllers array specifies the controllers that should be instantiated within this module.
  // Controllers are responsible for handling incoming requests and returning responses to the client.
  controllers: [AppController],
  // The providers array specifies the providers that should be instantiated by the NestJS injector and made available in this module.
  // Providers are typically services that handle the business logic of the application.
  providers: [AppService],
})
// The AppModule class is the root module of the application.
export class AppModule {}
