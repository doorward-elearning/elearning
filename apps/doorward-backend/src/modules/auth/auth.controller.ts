import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import LocalAuthGuard from './guards/local.auth.guard';
import SelfRegistrationEmail from './emails/self.registration.email';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import JwtAuthGuard from './guards/jwt.auth.guard';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import FrontendLinks from '../../utils/frontend.links';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import TransformerGroups from '@doorward/backend/decorators/transformer.groups.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginBody, RegisterBody } from '@doorward/common/dtos/body';
import { LoginResponse, UserResponse } from '@doorward/common/dtos/response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private emailService: EmailsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @TransformerGroups('privileges')
  @ApiOperation({ operationId: 'login', summary: 'Allow users to login with their username and password.' })
  @ApiResponse({
    status: 200,
    description: 'The logged in user',
    type: LoginResponse,
  })
  async login(@Request() req, @Body() loginBody: LoginBody): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @TransformerGroups('privileges')
  async register(@Body() registerBody: RegisterBody, @Request() req, @Origin() origin: string): Promise<LoginResponse> {
    const response = await this.authService.register(registerBody);
    const { user } = response;

    this.emailService.send(
      new SelfRegistrationEmail({
        subject: 'Confirm registration',
        data: {
          username: user.username,
          link: origin + FrontendLinks.login,
        },
        recipient: user.email,
      })
    );

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @TransformerGroups('privileges')
  async getCurrentUser(@CurrentUser() currentUser: UserEntity): Promise<UserResponse> {
    const user = await this.authService.getCurrentUser(currentUser.id);
    return { user };
  }
}
