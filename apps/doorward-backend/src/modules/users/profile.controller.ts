import { Body, Controller, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersService } from './users.service';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import Public from '@doorward/backend/decorators/public.decorator';
import Privileges from '../../decorators/privileges.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import TransformerGroups from '@doorward/backend/decorators/transformer.groups.decorator';
import { ForgotPasswordBody, ResetPasswordBody, UpdatePasswordBody } from '@doorward/common/dtos/body/auth.body';
import { UserResponse } from '@doorward/common/dtos/response';
import { UpdateAccountBody, UpdateProfilePictureBody } from '@doorward/common/dtos/body';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import translate from '@doorward/common/lang/translate';

@Controller('/users/profile')
@ApiTags('userProfile')
@UseGuards(JwtAuthGuard)
export default class ProfileController {
  constructor(private usersService: UsersService) {}

  @Get('/:username')
  @Privileges('profile.view')
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse, description: 'The profile of the specified user.' })
  @TransformerGroups('fullUserProfile')
  async getUserProfile(
    @Param('username') username: string,
    @CurrentUser() currentUser: UserEntity
  ): Promise<UserResponse> {
    const userName = username === 'me' ? currentUser.username : username;

    const user = await this.usersService.getUserDetails(null, userName);

    return { user };
  }

  @Put('account')
  @Privileges('profile.update')
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse, description: 'The newly updated user details' })
  @TransformerGroups('fullUserProfile')
  updateAccountDetails(@Body() body: UpdateAccountBody, @CurrentUser() currentUser: UserEntity): Promise<UserResponse> {
    return this.usersService.updateAccountDetails(body, currentUser);
  }

  @Put('account/profilePicture')
  @Privileges('profile.update')
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse, description: 'The newly updated user details' })
  @TransformerGroups('fullUserProfile')
  updateAccountProfilePicture(
    @Body() body: UpdateProfilePictureBody,
    @CurrentUser() currentUser: UserEntity
  ): Promise<UserResponse> {
    return this.usersService.updateAccountProfilePicture(body, currentUser);
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
      message: translate('passwordHasBeenUpdated'),
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
      message: hadPassword ? translate('passwordCreated') : translate('passwordHasBeenReset'),
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
      message: translate('passwordResetLinkHasBeenSentToYourEmail'),
    };
  }
}
