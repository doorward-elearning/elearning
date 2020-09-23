import OrganizationBasedRepository from './organization.based.repository';
import MeetingEntity from '@doorward/common/entities/meeting.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(MeetingEntity)
export default class MeetingsRepository extends OrganizationBasedRepository<MeetingEntity> {}
