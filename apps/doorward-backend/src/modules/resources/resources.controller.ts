import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PlainResponse from '../../decorators/plain.response.decorator';
import { ResourcesService } from './resources.service';

@Controller('resources')
@ApiTags('resources')
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @PlainResponse()
  @Get('translations')
  async getLocaleFile() {
    return this.resourcesService.getTranslations();
  }
}
