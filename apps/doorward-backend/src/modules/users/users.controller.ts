import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import OrganizationService from '../organization/organization.service';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService, private organizationService: OrganizationService) {}
}
