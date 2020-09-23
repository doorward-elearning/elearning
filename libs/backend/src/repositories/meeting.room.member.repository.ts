import OrganizationBasedRepository from './organization.based.repository';
import MeetingRoomMemberEntity from '@doorward/common/entities/meeting.room.member.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(MeetingRoomMemberEntity)
export default class MeetingRoomMemberRepository extends OrganizationBasedRepository<MeetingRoomMemberEntity> {}
