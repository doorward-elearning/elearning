import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import LocalAuthGuard from '@doorward/backend/guards/local.auth.guard';
import SelfRegistrationEmail from '../../emails/self.registration.email';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import TransformerGroups from '@doorward/backend/decorators/transformer.groups.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from '@doorward/common/dtos/response/auth.responses';
import { LoginBody, RegisterBody } from '@doorward/common/dtos/body/auth.body';
import { UserResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';
import ROUTES from '@doorward/common/frontend/routes/main';
import LocalStrategy from './strategies/local.strategy';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailsService,
    private localStrategy: LocalStrategy
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @TransformerGroups('privileges', 'fullUserProfile')
  @ApiOperation({ operationId: 'login', summary: 'Allow users to login with their username and password.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The logged in user', type: LoginResponse })
  async login(@Request() req, @Body() loginBody: LoginBody): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @TransformerGroups('privileges', 'fullUserProfile')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The user that was created', type: LoginResponse })
  async register(@Body() registerBody: RegisterBody, @Request() req, @Origin() origin: string): Promise<LoginResponse> {
    const response = await this.authService.register(registerBody);
    const { user } = response;

    this.emailService
      .send(
        new SelfRegistrationEmail({
          subject: translate('confirmRegistration'),
          data: { link: origin + ROUTES.auth.login },
          recipient: user,
        })
      )
      .then();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @TransformerGroups('privileges', 'fullUserProfile')
  @ApiResponse({ status: HttpStatus.OK, description: 'The currently logged in user', type: UserResponse })
  async getCurrentUser(@CurrentUser() currentUser: UserEntity): Promise<UserResponse> {
    const user = await this.authService.getCurrentUser(currentUser.id);
    return { user };
  }
}
