import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { HttpClientService } from '../../services/http-client/http-client.service';

@Module({
  providers: [UsersService, OpenviduService, HttpClientService],
  exports: [UsersService],
})
export class UsersModule {}
