import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserSessionRepository } from '@doorward/backend/repositories/user.session.repository';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.OPENVIDU_API_JWT_EXPIRY_SECONDS + 's' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, UserSessionRepository],
  exports: [AuthService],
})
export class AuthModule {}
