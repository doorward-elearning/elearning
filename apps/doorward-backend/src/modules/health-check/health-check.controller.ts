import { Controller, Get } from '@nestjs/common';
import DApiResponse from '@doorward/common/dtos/response/base.response';

@Controller('health-check')
export class HealthCheckController {
  @Get()
  public async healthCheck(): Promise<DApiResponse> {
    return {};
  }
}
