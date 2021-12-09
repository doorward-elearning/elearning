import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { HttpClientService } from '../../services/http-client/http-client.service';
import { UserSessionRepository } from '@doorward/backend/repositories/user.session.repository';

@Module({
  providers: [UsersService, OpenviduService, HttpClientService, UserSessionRepository],
  exports: [UsersService],
})
export class UsersModule {}
