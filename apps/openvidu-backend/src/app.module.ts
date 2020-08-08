import { Module } from '@nestjs/common';
import { CallModule } from './modules/call/call.module';
import { SignalsModule } from './modules/signals/signals.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from 'nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../ormconfig.js';

@Module({
  imports: [
    CallModule,
    SignalsModule,
    AuthModule,
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      db: +process.env.OPENVIDU_API_REDIS_DATABASE,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
