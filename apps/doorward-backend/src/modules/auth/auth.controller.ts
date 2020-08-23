import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginResponse from '@doorward/common/dtos/login.response';
import LoginBody from '@doorward/common/dtos/login.body';
import LocalAuthGuard from './guards/local.auth.guard';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import RegisterBody from '@doorward/common/dtos/register.body';
import SelfRegistrationEmail from './emails/self.registration.email';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import JwtAuthGuard from './guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private emailService: EmailsService) {}

  @UsePipes(new YupValidationPipe(LoginBody))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginBody: LoginBody): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @UsePipes(new YupValidationPipe(RegisterBody))
  @Post('register')
  async register(@Body() registerBody: RegisterBody, @Request() req): Promise<LoginResponse> {
    const response = await this.authService.register(registerBody);
    const { user } = response;

    this.emailService.send(
      new SelfRegistrationEmail().setRecipient(user.email).setData({
        username: user.username,
        link: req.headers.origin,
      })
    );

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCurrentUser(@CurrentUser() user: UserEntity) {
    return user;
  }
}
