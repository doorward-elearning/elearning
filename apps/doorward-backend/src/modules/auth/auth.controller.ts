import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginResponse from '@doorward/common/dtos/login.response';
import LoginBody from '@doorward/common/dtos/login.body';
import LocalAuthGuard from './guards/local.auth.guard';
import RegisterBody from '@doorward/common/dtos/register.body';
import SelfRegistrationEmail from './emails/self.registration.email';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import JwtAuthGuard from './guards/jwt.auth.guard';
import UserResponse from '@doorward/common/dtos/user.response';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import FrontendLinks from '../../utils/frontend.links';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private emailService: EmailsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginBody: LoginBody): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @Post('register')
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
  async getCurrentUser(@CurrentUser() currentUser: UserEntity): Promise<UserResponse> {
    const user = await this.authService.getCurrentUser(currentUser.id);
    return { user };
  }
}
