import { Injectable } from '@nestjs/common';
import MeetingRoomRepository from '@repositories/meeting.room.repository';
import MeetingRoomMemberRepository from '@repositories/meeting.room.member.repository';

@Injectable()
export class MeetingRoomsService {
  constructor(
    private meetingRoomRepository: MeetingRoomRepository,
    private meetingRoomMemberRepository: MeetingRoomMemberRepository
  ) {}

  async alreadyExistsInMeetingRoom(meetingRoomId: string, userId: string) {
    return await this.meetingRoomMemberRepository.find({
      where: {
        meetingRoom: { id: meetingRoomId },
        participant: { id: userId },
      },
    });
  }

  async addToMeetingRoom(meetingRoomId: string, userId: string) {
    const defaults = {
      meetingRoom: { id: meetingRoomId },
      participant: { id: userId },
    };
    if (!(await this.alreadyExistsInMeetingRoom(meetingRoomId, userId))) {
      await this.meetingRoomMemberRepository.save(this.meetingRoomMemberRepository.create(defaults));
    }
  }
}
