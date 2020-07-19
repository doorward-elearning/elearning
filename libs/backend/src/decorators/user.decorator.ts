import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, context: any) => {
  return context.switchToHttp ? context.switchToHttp().getRequest().user : context.user;
});
