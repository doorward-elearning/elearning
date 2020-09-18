import { Injectable } from '@nestjs/common';
import MeetingRoomRepository from '@repositories/meeting.room.repository';
import MeetingRoomMemberRepository from '@repositories/meeting.room.member.repository';

@Injectable()
export class MeetingRoomsService {
  constructor(
    private meetingRoomRepository: MeetingRoomRepository,
    private meetingRoomMemberRepository: MeetingRoomMemberRepository
  ) {}

  async addToMeetingRoom(meetingRoomId: string, userId: string) {
    const defaults = {
      meetingRoom: {
        id: meetingRoomId,
      },
      participant: {
        id: userId,
      },
    };
    const alreadyExists = await this.meetingRoomMemberRepository.find({
      where: defaults,
    });

    if (!alreadyExists) {
      await this.meetingRoomMemberRepository.save(this.meetingRoomMemberRepository.create(defaults));
    }
  }
}
