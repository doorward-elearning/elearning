import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import MeetingsRepository from '@doorward/backend/repositories/meetings.repository';
import UserEntity from '@doorward/common/entities/user.entity';
import MeetingEntity from '@doorward/common/entities/meeting.entity';
import { MeetingRoomsService } from '../meeting-rooms/meeting-rooms.service';
import Capabilities from '@doorward/common/utils/Capabilities';
import { defaultMeetingCapabilities, MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import { OPENVIDU_ROLES, OpenviduWebHookEvents } from '@doorward/common/types/openvidu';
import { ORGANIZATION } from '../../bootstrap/organizationSetup';
import { MeetingPlatform, MeetingStatus } from '@doorward/common/types/meeting';
import { MeetingResponse } from '@doorward/common/dtos/response/meetings.responses';
import { OpenviduWebHookBody } from '@doorward/common/dtos/body/openvidu.body';
import Tools from '@doorward/common/utils/Tools';
import translate from '@doorward/common/lang/translate';

@Injectable()
export class MeetingsService {
  constructor(private meetingsRepository: MeetingsRepository, private meetingRoomsService: MeetingRoomsService) {}

  /**
   *
   * @param meetingId
   * @param currentUser
   */
  public async joinMeeting(meetingId: string, currentUser?: UserEntity): Promise<MeetingResponse> {
    const meeting = await this.meetingsRepository.findOne(meetingId, { relations: ['meetingRoom'] });

    const meetingRoom = meeting.meetingRoom;

    if (meetingRoom) {
      if (!currentUser || !(await this.meetingRoomsService.existsInMeetingRoom(meetingRoom.id, currentUser.id))) {
        throw new UnauthorizedException(translate.youAreNotAllowedToJoinMeeting());
      }

      const role = (await currentUser.hasPrivileges('meetings.moderate'))
        ? OPENVIDU_ROLES.MODERATOR
        : OPENVIDU_ROLES.PUBLISHER;

      return ORGANIZATION.meetingPlatform === MeetingPlatform.OPENVIDU
        ? this.joinOpenviduMeeting(meeting, role, currentUser)
        : this.joinJitsiMeeting(meeting, role, currentUser);
    } else {
      throw new BadRequestException(translate.meetingDoesNotHaveARoom());
    }
  }

  public async endMeeting(meetingId: string, currentUser: UserEntity) {
    const meeting = await this.meetingsRepository.findOne(meetingId);

    if (!(await currentUser.hasPrivileges('meetings.moderate'))) {
      throw new UnauthorizedException(translate.youAreNotAllowedToEndMeeting());
    }

    await this.meetingsRepository.update(meeting.id, {
      status: MeetingStatus.ENDED,
    });
  }

  /**
   *
   * @param meeting
   * @param role
   * @param user
   */
  public async joinOpenviduMeeting(meeting: MeetingEntity, role: OPENVIDU_ROLES, user?: UserEntity) {
    const capabilities = new Capabilities(MeetingCapabilities, defaultMeetingCapabilities);

    if (ORGANIZATION.customerType === CustomerTypes.COLLEGE_INDIA) {
      if (role === OPENVIDU_ROLES.MODERATOR) {
        capabilities.add(MeetingCapabilities.TURN_OFF_PARTICIPANTS_VIDEO);
        capabilities.add(MeetingCapabilities.TURN_ON_PARTICIPANTS_VIDEO);
        capabilities.add(MeetingCapabilities.MUTE_PARTICIPANTS);
        capabilities.add(MeetingCapabilities.UNMUTE_PARTICIPANTS);
        capabilities.add(MeetingCapabilities.JOIN_WITH_ACTIVE_VIDEO);
      }
    }

    return {
      user,
      capabilities,
      meeting,
    };
  }

  /**
   *
   * @param meeting
   * @param role
   * @param user
   */
  public async joinJitsiMeeting(meeting: MeetingEntity, role: OPENVIDU_ROLES, user?: UserEntity) {
    return {
      user,
      meeting,
    };
  }

  /**
   *
   * @param body
   */
  public async processOpenviduWebHook(body: OpenviduWebHookBody) {
    const meeting = await this.meetingsRepository.findOne({
      where: {
        sessionId: body.sessionId,
      },
    });

    if (meeting) {
      switch (body.event) {
        case OpenviduWebHookEvents.SESSION_DESTROYED:
          await this.meetingsRepository.update(meeting.id, {
            status: MeetingStatus.ENDED,
          });
          break;
      }
    }
  }

  /**
   *
   * @param meetingRoomId
   * @param status
   */
  public async createMeeting(meetingRoomId: string, status = MeetingStatus.PENDING): Promise<MeetingEntity> {
    return this.meetingsRepository.save(
      this.meetingsRepository.create({
        meetingRoom: { id: meetingRoomId },
        sessionId: Tools.randomString(10),
        host: null,
        status,
      })
    );
  }
}
