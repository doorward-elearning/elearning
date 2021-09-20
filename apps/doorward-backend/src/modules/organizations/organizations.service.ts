import { Injectable } from '@nestjs/common';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { CreateOrganizationBody, UpdateOrganizationBody } from '@doorward/common/dtos/body';
import OrganizationsRepository from '@doorward/backend/repositories/organizations.repository';
import { MeetingPlatform } from '@doorward/common/types/meeting';

@Injectable()
export class OrganizationsService {
  constructor(private organizationRepository: OrganizationsRepository) {}

  /**
   *
   */
  public async getAll() {
    return this.organizationRepository.find();
  }

  /**
   *
   * @param body
   */
  public async createOrganization(body: CreateOrganizationBody): Promise<OrganizationEntity> {
    return this.organizationRepository.save(
      this.organizationRepository.create({
        ...body,
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
}
