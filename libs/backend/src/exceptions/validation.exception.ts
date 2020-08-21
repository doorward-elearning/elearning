import { UnprocessableEntityException } from '@nestjs/common';

export default class ValidationException extends UnprocessableEntityException {
  constructor(errors: Record<string, string>) {
    super(errors);
  }
}
