import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import MeetingEntity from '@doorward/common/entities/meeting.entity';

export default class MeetingsRepository extends MultiOrganizationRepository<MeetingEntity> {
  getEntity(): ObjectType<MeetingEntity> {
    return MeetingEntity;
  }
}
