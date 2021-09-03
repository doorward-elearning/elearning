import { applyDecorators, Injectable, Scope } from '@nestjs/common';

export const MultiOrganizationService = () => applyDecorators(Injectable({ scope: Scope.REQUEST }));
