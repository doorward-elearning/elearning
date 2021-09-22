import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import { LoginBody } from '@doorward/common/dtos/body/auth.body';
import LocalStrategy from '@doorward/backend/modules/base-auth/strategies/local.strategy';

@Injectable()
export default class LocalAuthGuard extends AuthGuard('local') {
  constructor(private localStrategy: LocalStrategy) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const http = context.switchToHttp();
    const body = http.getRequest().body;

    await YupValidationPipe.validate(LoginBody, body);

    return super.canActivate(context) as any;
  }
}
