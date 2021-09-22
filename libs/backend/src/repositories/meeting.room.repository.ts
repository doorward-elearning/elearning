import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import MeetingRoomEntity from '@doorward/common/entities/meeting.room.entity';

export default class MeetingRoomRepository extends MultiOrganizationRepository<MeetingRoomEntity> {
  getEntity(): ObjectType<MeetingRoomEntity> {
    return MeetingRoomEntity;
  }
}
