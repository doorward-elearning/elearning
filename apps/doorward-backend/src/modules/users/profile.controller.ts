import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import UpdateAccountBody from '@doorward/common/dtos/update.account.body';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import UserResponse from '@doorward/common/dtos/user.response';
import { UsersService } from './users.service';
import OrganizationService from '../organization/organization.service';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import UpdatePasswordBody from '@doorward/common/dtos/update.password.body';
import ResetPasswordBody from '@doorward/common/dtos/reset.password.body';
import ForgotPasswordBody from '@doorward/common/dtos/forgot.password.body';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import Public from '@doorward/backend/decorators/public.decorator';

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

  @Post('resetPassword')
  async resetAccountPassword(@Body() body: ResetPasswordBody): Promise<ApiResponse> {
    const hadPassword = await this.usersService.resetAccountPassword(body);

    return {
      message: hadPassword
        ? 'Password has been created. You can now login with the new credentials'
        : 'Your password has been reset successfully.',
    };
  }

  @Post('forgotPassword')
  @Public()
  async forgotAccountPassword(@Body() body: ForgotPasswordBody, @Origin() origin: string): Promise<ApiResponse> {
    await this.usersService.userForgotPassword(body, origin);
    return {
      message: 'A password reset link has been sent to your email.',
    };
  }
}
