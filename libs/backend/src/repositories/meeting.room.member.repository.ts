import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import MeetingRoomMemberEntity from '@doorward/common/entities/meeting.room.member.entity';

export default class MeetingRoomMemberRepository extends MultiOrganizationRepository<MeetingRoomMemberEntity> {
  getEntity(): ObjectType<MeetingRoomMemberEntity> {
    return MeetingRoomMemberEntity;
  }
}
