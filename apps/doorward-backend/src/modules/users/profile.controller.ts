import { Body, Controller, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersService } from './users.service';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import Public from '@doorward/backend/decorators/public.decorator';
import DApiResponse from '@doorward/common/dtos/response/d.api.response';
import Privileges from '../../decorators/privileges.decorator';
import { ApiResponse } from '@nestjs/swagger';
import TransformerGroups from '@doorward/backend/decorators/transformer.groups.decorator';
import { ForgotPasswordBody, ResetPasswordBody } from '@doorward/common/dtos/body/auth.body';

@Controller('/users/profile')
@UseGuards(JwtAuthGuard)
export default class ProfileController {
  constructor(private usersService: UsersService) {}

  @Put('account')
  @Privileges('profile.update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponse,
    description: 'The newly updated user details',
  })
  @TransformerGroups('fullUserProfile')
  updateAccountDetails(@Body() body: UpdateAccountBody, @CurrentUser() currentUser: UserEntity): Promise<UserResponse> {
    return this.usersService.updateAccountDetails(body, currentUser);
  }

  @Put('password')
  @Privileges('profile.update-password')
  @ApiResponse({
    status: HttpStatus.OK,
    type: DApiResponse,
    description: 'A message showing that the password has changed',
  })
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
  @Privileges('profile.reset-password')
  @ApiResponse({
    type: DApiResponse,
    description: 'A message notifying the user of the password reset.',
    status: HttpStatus.OK,
  })
  async resetAccountPassword(@Body() body: ResetPasswordBody): Promise<DApiResponse> {
    const hadPassword = await this.usersService.resetAccountPassword(body);

    return {
      message: hadPassword
        ? 'Password has been created. You can now login with the new credentials'
        : 'Your password has been reset successfully.',
    };
  }

  @Post('forgotPassword')
  @Privileges('profile.send-forgot-password-link')
  @Public()
  @ApiResponse({
    type: DApiResponse,
    description: 'A message notifying the user that the password reset link has been sent to their email',
    status: HttpStatus.OK,
  })
  async forgotAccountPassword(@Body() body: ForgotPasswordBody, @Origin() origin: string): Promise<DApiResponse> {
    await this.usersService.userForgotPassword(body, origin);
    return {
      message: 'A password reset link has been sent to your email.',
    };
  }
}
