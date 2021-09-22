import { applyDecorators, Injectable, Scope } from '@nestjs/common';

export const RequestScopedInjectable = () => applyDecorators(Injectable({ scope: Scope.REQUEST }));
