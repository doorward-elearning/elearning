import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BaseAuthService } from '@doorward/backend/modules/base-auth/base-auth.service';
import LocalStrategy from '@doorward/backend/modules/base-auth/strategies/local.strategy';
import JwtStrategy from '@doorward/backend/modules/base-auth/strategies/jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [BaseAuthService, LocalStrategy, JwtStrategy],
  exports: [BaseAuthService, LocalStrategy, JwtStrategy],
})
export class BaseAuthModule {}
