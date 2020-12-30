import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import JwtStrategy from '@doorward/backend/modules/base-auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY_TIME,
      },
    }),
  ],
  controllers: [],
  providers: [JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard],
})
export class BaseAuthModule {}
