import { Module } from '@nestjs/common';
import { CallModule } from '../modules/call/call.module';
import { SignalsModule } from '../modules/signals/signals.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [CallModule, SignalsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
