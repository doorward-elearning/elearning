import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ORGANIZATION } from '../../bootstrap/organizationSetup';
import { Origin } from '@doorward/backend/decorators/origin.decorator';
import { JitsiBrandingResponse } from '@doorward/common/dtos/response';
import { ApiResponse } from '@nestjs/swagger';

@Controller('jitsi')
export class JitsiController {
  /**
   *
   * @param origin
   */
  @Get('branding')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The jitsi branding information',
    type: JitsiBrandingResponse,
  })
  public async getJitsiBranding(@Origin() origin: string): Promise<JitsiBrandingResponse> {
    return {
      logoClickUrl: ORGANIZATION.link,
      logoImageUrl: ORGANIZATION.icon,
      inviteDomain: origin,
    };
  }
}
