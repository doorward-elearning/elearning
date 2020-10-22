import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PlainResponse from '../../decorators/plain.response.decorator';
import { ResourcesService } from './resources.service';

@Controller('resources')
@ApiTags('resources')
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @PlainResponse()
  @Get('locales/:lang/:file')
  async getLocaleFile(@Param('lang') lang: string, @Param('file') file: string) {
    return this.resourcesService.getLocaleTranslation(lang, file);
  }
}
