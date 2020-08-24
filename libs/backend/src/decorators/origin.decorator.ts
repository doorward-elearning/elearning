import { createParamDecorator } from '@nestjs/common';

export const Origin = createParamDecorator((data: unknown, context: any) => {
  let request;
  if (context.switchToHttp) {
    request = context.switchToHttp().getRequest();
  } else if (context.protocol) {
    request = context;
  }
  if (request) {
    const hostUrl = request.protocol + '://' + request.get('host');
    return request.query.redirect_origin || request.headers.origin || hostUrl;
  }
});
