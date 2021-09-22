import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PlainResponse from '../../decorators/plain.response.decorator';
import { ResourcesService } from './resources.service';
import DoorwardLogger from '@doorward/backend/modules/logging/doorward.logger';

@Controller('resources')
@ApiTags('resources')
export class ResourcesController {
  constructor(private resourcesService: ResourcesService, private logger: DoorwardLogger) {}

  @PlainResponse()
  @Get('translations')
  async getLocaleFile() {
    this.logger.log('Getting resources');
    return this.resourcesService.getTranslations();
  }
}
