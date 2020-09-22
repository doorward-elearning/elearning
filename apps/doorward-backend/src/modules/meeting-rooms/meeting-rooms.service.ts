import { Injectable } from '@nestjs/common';
import MeetingRoomRepository from '@repositories/meeting.room.repository';
import MeetingRoomMemberRepository from '@repositories/meeting.room.member.repository';
import { MeetingRoomTypes } from '@doorward/common/types/meeting';
import MeetingRoomEntity from '@doorward/common/entities/meeting.room.entity';

@Injectable()
export class MeetingRoomsService {
  constructor(
    private meetingRoomRepository: MeetingRoomRepository,
    private meetingRoomMemberRepository: MeetingRoomMemberRepository
  ) {}

  /**
   *
   * @param meetingRoomId
   * @param userId
   */
  async existsInMeetingRoom(meetingRoomId: string, userId: string) {
    return await this.meetingRoomMemberRepository.find({
      where: {
        meetingRoom: { id: meetingRoomId },
        participant: { id: userId },
      },
    });
  }

  /**
   *
   * @param meetingRoomId
   * @param userId
   */
  async addToMeetingRoom(meetingRoomId: string, userId: string) {
    const defaults = {
      meetingRoom: { id: meetingRoomId },
      participant: { id: userId },
    };
    if (!(await this.existsInMeetingRoom(meetingRoomId, userId))) {
      await this.meetingRoomMemberRepository.save(this.meetingRoomMemberRepository.create(defaults));
    }
  }

  /**
   *
   * @param meetingRoomId
   * @param userId
   */
  async removeFromMeetingRoom(meetingRoomId: string, userId: string) {
    await this.meetingRoomMemberRepository.softDelete({
      meetingRoom: { id: meetingRoomId },
      participant: { id: userId },
    });
  }

  /**
   *
   * @param title
   * @param type
   */
  async createMeetingRoom(title: string, type = MeetingRoomTypes.PUBLIC): Promise<MeetingRoomEntity> {
    return this.meetingRoomRepository.save(
      this.meetingRoomRepository.create({
        title,
        type,
      })
    );
  }
}
