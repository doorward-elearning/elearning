import { Inject, Injectable } from '@nestjs/common';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { CreateOrganizationBody, UpdateOrganizationBody } from '@doorward/common/dtos/body';
import OrganizationsRepository from '@doorward/backend/repositories/organizations.repository';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import { HttpService } from '@nestjs/axios';
import DoorwardLogger from '@doorward/backend/modules/logging/doorward.logger';
import { ConnectionOptions } from 'typeorm';
import { MAIN_CONNECTION_OPTIONS } from '@doorward/backend/constants';
import execShellCommand from '@doorward/backend/utils/execShellCommand';
import { privilegesSetup } from '../../bootstrap/privilegesSetup';
import connectDatabase from '@doorward/backend/database/connectDatabase';
import entities from '@doorward/common/entities';
import organizationConfigSetup from '../../bootstrap/organizationSetup';
import { organizationRolesSetup } from '../../bootstrap/organizationRolesSetup';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject(MAIN_CONNECTION_OPTIONS) private mainConnectionOptions: ConnectionOptions,
    private organizationRepository: OrganizationsRepository,
    private httpService: HttpService,
    private logger: DoorwardLogger
  ) {
    logger.setContext('OrganizationsService');
  }

  /**
   *
   */
  public async getAll() {
    return this.organizationRepository.find();
  }

  public async getRootOrganization() {
    return this.organizationRepository.findOne({
      where: {
        id: process.env.DEFAULT_ORGANIZATION_ID,
      },
    });
  }

  public async createOrganizationIngress(organization: OrganizationEntity) {
    const hosts = organization.hosts.split(/\s*,\s*/);

    const namespace = process.env.DEFAULT_ORGANIZATION_NAME;

    const requestBody = {
      namespace: namespace + '-doorward',
      'primary-org-name': namespace,
      'service-name': namespace + '-chuchu',
      'org-name': organization.name,
      'org-host': '',
    };

    this.logger.info('Creating ingress for organization [' + organization.name + '] - ' + requestBody);

    return Promise.all(
      hosts.map(async (host) => {
        this.logger.info('Creating host: ' + host);
        let success = true;
        try {
          const response = await this.httpService
            .post(
              process.env.ORGANIZATION_INGRESS_URL,
              { ...requestBody, 'org-host': host },
              { headers: { 'Content-Type': 'application/json' } }
            )
            .toPromise();

          this.logger.info('Organization [' + organization.name + '] ingress created: ' + response.data);
        } catch (e) {
          success = false;
          this.logger.error(
            e,
            'Organization [' + organization.name + '] failed to create organization ingress: ' + host
          );
        }

        return { host, result: success };
      })
    );
  }

  /**
   *
   * @param body
   */
  public async createOrganization(body: CreateOrganizationBody): Promise<OrganizationEntity> {
    return this.organizationRepository.save(
      this.organizationRepository.create({
        ...body,
        databaseName: body.name + '-doorward',
        meetingPlatform: body.meetingPlatform || MeetingPlatform.OPENVIDU,
        descriptiveLogo: !!body.descriptiveLogo,
      })
    );
  }

  /**
   *
   * @param organizationId
   * @param body
   */
  public async updateOrganization(organizationId: string, body: UpdateOrganizationBody) {
    await this.organizationRepository.update(organizationId, {
      ...body,
      meetingPlatform: body.meetingPlatform || MeetingPlatform.OPENVIDU,
      descriptiveLogo: !!body.descriptiveLogo,
    });
    return this.getOrganizationById(organizationId);
  }

  /**
   *
   * @param organizationId
   */
  public async getOrganizationById(organizationId) {
    return this.organizationRepository.findOne(organizationId);
  }

  public async initializeOrganizationDatabase(organization: OrganizationEntity) {
    await execShellCommand('yarn db:thala:migrate -x ' + organization.id);

    const connection = await connectDatabase(entities, {
      ...this.mainConnectionOptions,
      database: organization.databaseName,
      name: organization.name,
    });

    await organizationConfigSetup(connection);
    await privilegesSetup(connection);
    await organizationRolesSetup(connection, organization, this.organizationRepository.manager.connection);
  }
}
