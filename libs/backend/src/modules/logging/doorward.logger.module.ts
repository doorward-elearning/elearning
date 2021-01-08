import { Global, Module } from '@nestjs/common';
import DoorwardLogger from './doorward.logger';
import { WinstonModule } from 'nest-winston';
import winstonConfig from './winston.config';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [DoorwardLogger],
  exports: [DoorwardLogger],
})
@Global()
export class DoorwardLoggerModule {}
