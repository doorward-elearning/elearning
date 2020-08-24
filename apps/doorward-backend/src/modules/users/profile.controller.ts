import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import UpdateAccountBody from '@doorward/common/dtos/update.account.body';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import UserResponse from '@doorward/common/dtos/user.response';
import { UsersService } from './users.service';
import OrganizationService from '../organization/organization.service';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import UpdatePasswordBody from '@doorward/common/dtos/update.password.body';

@Controller('/users/profile')
@UseGuards(JwtAuthGuard)
export default class ProfileController {
  constructor(private usersService: UsersService, private organizationService: OrganizationService) {}

  @Put('account')
  updateAccountDetails(@Body() body: UpdateAccountBody, @CurrentUser() currentUser: UserEntity): Promise<UserResponse> {
    return this.usersService.updateAccountDetails(body, currentUser);
  }

  @Put('password')
  async updateAccountPassword(
    @Body() body: UpdatePasswordBody,
    @CurrentUser() currentUser: UserEntity
  ): Promise<ApiResponse> {
    await this.usersService.updateAccountPassword(body, currentUser);
    return {
      message: 'Password has been updated.',
    };
  }
}
