import { Controller, Get, HttpStatus } from '@nestjs/common';
import { JitsiBrandingResponse } from '@doorward/common/dtos/response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentOrganization } from '@doorward/backend/decorators/organization.decorator';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

@Controller('jitsi')
@ApiTags('jitsi')
export class JitsiController {
  /**
   *
   * @param organization
   */
  @Get('branding')
  @ApiResponse({ status: HttpStatus.OK, description: 'The jitsi branding information', type: JitsiBrandingResponse })
  public async getJitsiBranding(
    @CurrentOrganization() organization: OrganizationEntity
  ): Promise<JitsiBrandingResponse> {
    return {
      logoClickUrl: organization.link,
      logoImageUrl: organization.logo,
      inviteDomain: organization.link,
    };
  }
}
