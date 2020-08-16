import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import ormConfig from '../ormconfig.js';
import entities from './database/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...ormConfig,
        entities,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
