import { Controller, Get } from '@nestjs/common';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import { ApiTags } from '@nestjs/swagger';

@Controller('health-check')
@ApiTags('healthCheck')
export class HealthCheckController {
  @Get()
  public async healthCheck(): Promise<DApiResponse> {
    return {};
  }
}
