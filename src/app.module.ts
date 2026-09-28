import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AppController } from './app.controller';
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({

  imports: [
    //*variables de entorno y conexcion db
    ConfigModule.forRoot({
      //*Varibales de entorno puede acceder de manera global
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      //*usefactory nos da acceso a las variables de entorno
      useFactory: (configService: ConfigService) => typeOrmConfig(configService),
      inject: [ConfigService]

    }),
    CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
