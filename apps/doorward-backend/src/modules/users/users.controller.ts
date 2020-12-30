import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
}
