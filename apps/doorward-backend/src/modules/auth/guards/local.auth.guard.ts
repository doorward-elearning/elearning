import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import LoginBody from '@doorward/common/dtos/login.body';
import YupValidationPipe from '@doorward/backend/pipes/yup.validation.pipe';

export default class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<any> {
    const http = context.switchToHttp();
    const body = http.getRequest().body;

    await YupValidationPipe.validate(LoginBody, body);

    return super.canActivate(context) as any;
  }
}
