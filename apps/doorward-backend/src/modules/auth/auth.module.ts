import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import LocalStrategy from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from '@doorward/backend/modules/base-auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';

@Global()
@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
