import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import Public from '@doorward/backend/decorators/public.decorator';
import OrganizationResponse from '@doorward/common/dtos/organization.response';
import { OrganizationsService } from './organizations.service';

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
