import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import Public from '@doorward/backend/decorators/public.decorator';
import { OrganizationsService } from './organizations.service';
import { OrganizationResponse } from '@doorward/common/dtos/response';
import { ApiResponse } from '@nestjs/swagger';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private organizationService: OrganizationsService) {}
  @Get('current')
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The current organization running this service',
    type: OrganizationResponse,
  })
  async getOrganization(): Promise<OrganizationResponse> {
    return {
      organization: await this.organizationService.get(),
    };
  }
}
