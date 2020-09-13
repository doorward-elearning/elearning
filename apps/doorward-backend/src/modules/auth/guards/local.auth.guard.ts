import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';
import { LoginBody } from '@doorward/common/dtos/body';

export default class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<any> {
    const http = context.switchToHttp();
    const body = http.getRequest().body;

    await YupValidationPipe.validate(LoginBody, body);

    return super.canActivate(context) as any;
  }
}
