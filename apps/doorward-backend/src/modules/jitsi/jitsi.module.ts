import { Module } from '@nestjs/common';
import { JitsiController } from './jitsi.controller';
import { JitsiService } from './jitsi.service';

@Module({
  controllers: [JitsiController],
  providers: [JitsiService]
})
export class JitsiModule {}
