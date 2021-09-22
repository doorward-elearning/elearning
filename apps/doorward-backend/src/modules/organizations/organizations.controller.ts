import { Body, Controller, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import Public from '@doorward/backend/decorators/public.decorator';
import { OrganizationsService } from './organizations.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationResponse, OrganizationsResponse } from '@doorward/common/dtos/response/organization.responses';
import PrivilegesGuard from '../../../../doorward-backend/src/guards/privileges.guard';
import Privileges from '../../../../doorward-backend/src/decorators/privileges.decorator';
import { CreateOrganizationBody, UpdateOrganizationBody } from '@doorward/common/dtos/body';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import translate from '@doorward/common/lang/translate';
import { CurrentOrganization } from '@doorward/backend/decorators/organization.decorator';

const OrganizationExists = () =>
  ModelExists({ key: 'organizationId', model: OrganizationEntity, message: translate('organizationNotExists') });

@Controller('organizations')
@ApiTags('organizations')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class OrganizationsController {
  constructor(private organizationService: OrganizationsService) {}

  /**
   *
   */
  @Get('current')
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The current organization running this service',
    type: OrganizationResponse,
  })
  async getCurrentOrganization(@CurrentOrganization() organization: OrganizationEntity): Promise<OrganizationResponse> {
    return {
      organization,
    };
  }

  /**
   *
   * @param body
   */
  @Post()
  @Privileges('organizations.create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The organization that was created.',
    type: OrganizationResponse,
  })
  async createOrganization(@Body() body: CreateOrganizationBody): Promise<OrganizationResponse> {
    const organization = await this.organizationService.createOrganization(body);

    await this.organizationService.initializeOrganizationDatabase(organization);

    if (process.env.NODE_ENV === 'production') {
      await this.organizationService.createOrganizationIngress(organization);
    }

    return { organization, message: translate('organizationCreated') };
  }

  /**
   *
   */
  @Get()
  @Privileges('organizations.view')
  @ApiResponse({ status: HttpStatus.OK, description: 'The list of organizations', type: OrganizationsResponse })
  async getAllOrganizations(): Promise<OrganizationsResponse> {
    const organizations = await this.organizationService.getAll();

    return { organizations };
  }

  /**
   *
   * @param organizationId
   * @param body
   */
  @Put(':organizationId')
  @Privileges('organizations.update')
  @OrganizationExists()
  @ApiResponse({ status: HttpStatus.OK, description: 'The organization that was updated', type: OrganizationResponse })
  async updateOrganization(
    @Param('organizationId') organizationId: string,
    @Body() body: UpdateOrganizationBody
  ): Promise<OrganizationResponse> {
    const organization = await this.organizationService.updateOrganization(organizationId, body);

    return { organization };
  }

  /**
   *
   * @param organizationId
   */
  @Get(':organizationId')
  @Privileges('organizations.view')
  @OrganizationExists()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The organization with the specified id',
    type: OrganizationResponse,
  })
  async getOrganization(@Param('organizationId') organizationId: string): Promise<OrganizationResponse> {
    const organization = await this.organizationService.getOrganizationById(organizationId);

    return {
      organization,
    };
  }
}
