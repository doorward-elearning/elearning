import OrganizationBasedRepository from './organization.based.repository';
import MeetingRoomEntity from '@doorward/common/entities/meeting.room.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(MeetingRoomEntity)
export default class MeetingRoomRepository extends OrganizationBasedRepository<MeetingRoomEntity> {}
