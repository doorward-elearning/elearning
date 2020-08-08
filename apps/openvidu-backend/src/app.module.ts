import { Module } from '@nestjs/common';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { SignalsModule } from './modules/signals/signals.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from 'nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../ormconfig.js';
import { CapabilityEntity } from './database/entities/capability.entity';
import MeetingEntity from './database/entities/meeting.entity';
import UserEntity from './database/entities/user.entity';
import WhiteboardEntity from './database/entities/whiteboard.entity';

const entities = [CapabilityEntity, MeetingEntity, UserEntity, WhiteboardEntity];

@Module({
  imports: [
    MeetingsModule,
    SignalsModule,
    AuthModule,
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      db: +process.env.OPENVIDU_API_REDIS_DATABASE,
    }),
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
