import { createParamDecorator } from '@nestjs/common';

export const CurrentOrganization = createParamDecorator((data: unknown, context: any) => {
  return context.switchToHttp ? context.switchToHttp().getRequest().organization : context.organization;
});
