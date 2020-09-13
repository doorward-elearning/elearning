import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersService } from './users.service';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import Public from '@doorward/backend/decorators/public.decorator';
import DApiResponse from '@doorward/common/dtos/response/d.api.response';
import {
  ForgotPasswordBody,
  ResetPasswordBody,
  UpdateAccountBody,
  UpdatePasswordBody,
} from '@doorward/common/dtos/body';
import { UserResponse } from '@doorward/common/dtos/response';

@Controller('/users/profile')
@UseGuards(JwtAuthGuard)
export default class ProfileController {
  constructor(private usersService: UsersService) {}

  @Put('account')
  updateAccountDetails(@Body() body: UpdateAccountBody, @CurrentUser() currentUser: UserEntity): Promise<UserResponse> {
    return this.usersService.updateAccountDetails(body, currentUser);
  }

  @Put('password')
  async updateAccountPassword(
    @Body() body: UpdatePasswordBody,
    @CurrentUser() currentUser: UserEntity
  ): Promise<DApiResponse> {
    await this.usersService.updateAccountPassword(body, currentUser);
    return {
      message: 'Password has been updated.',
    };
  }

  @Post('resetPassword')
  async resetAccountPassword(@Body() body: ResetPasswordBody): Promise<DApiResponse> {
    const hadPassword = await this.usersService.resetAccountPassword(body);

    return {
      message: hadPassword
        ? 'Password has been created. You can now login with the new credentials'
        : 'Your password has been reset successfully.',
    };
  }

  @Post('forgotPassword')
  @Public()
  async forgotAccountPassword(@Body() body: ForgotPasswordBody, @Origin() origin: string): Promise<DApiResponse> {
    await this.usersService.userForgotPassword(body, origin);
    return {
      message: 'A password reset link has been sent to your email.',
    };
  }
}
