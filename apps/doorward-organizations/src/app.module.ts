import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Global()
@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {}
}
