import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import OrganizationService from '../organization/organization.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private organizationService: OrganizationService) {}

  @Get('/')
  async getAll() {
    console.log(this.organizationService.get());
    return this.usersService.getAllUsers();
  }
}
