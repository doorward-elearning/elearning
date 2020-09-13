import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import Public from '@doorward/backend/decorators/public.decorator';
import { OrganizationsService } from './organizations.service';
import { OrganizationResponse } from '@doorward/common/dtos/response';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private organizationService: OrganizationsService) {}
  @Get('current')
  @Public()
  async getOrganization(): Promise<OrganizationResponse> {
    return {
      organization: await this.organizationService.get(),
    };
  }
}
