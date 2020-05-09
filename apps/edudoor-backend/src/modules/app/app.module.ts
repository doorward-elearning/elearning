import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as PostgresConnectionStringParser from 'pg-connection-string';
import entities from '../../entities';

const connectionOptions = PostgresConnectionStringParser.parse(process.env.DATABASE_URL);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connectionOptions.host,
      port: +connectionOptions.port,
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
