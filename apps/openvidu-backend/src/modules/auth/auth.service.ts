import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OpenviduUser } from '@doorward/common/types/openvidu';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(connectionId: string, sessionId: string): Promise<OpenviduUser | null> {
    return this.usersService.findOne(connectionId, sessionId);
  }
}
