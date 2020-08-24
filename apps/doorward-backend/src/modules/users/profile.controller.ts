import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import UpdateAccountBody from '@doorward/common/dtos/update.account.body';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import UserResponse from '@doorward/common/dtos/user.response';
import { UsersService } from './users.service';
import OrganizationService from '../organization/organization.service';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';

@Controller('/users/profile')
@UseGuards(JwtAuthGuard)
export default class ProfileController {
  constructor(private usersService: UsersService, private organizationService: OrganizationService) {}

  @Put('account')
  updateAccountDetails(@Body() body: UpdateAccountBody, @CurrentUser() currentUser: UserEntity): Promise<UserResponse> {
    return this.usersService.updateAccountDetails(body, currentUser);
  }

  @Put("password")
  updateAccountPassword() {

  }
}
