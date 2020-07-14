import { Module } from '@nestjs/common';
import { CallModule } from '../modules/call/call.module';
import { SignalsModule } from '../modules/signals/signals.module';

@Module({
  imports: [CallModule, SignalsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
