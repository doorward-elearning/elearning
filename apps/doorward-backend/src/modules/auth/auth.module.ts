import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { BaseAuthModule } from '@doorward/backend/modules/base-auth/base-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    UsersModule,
    BaseAuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
