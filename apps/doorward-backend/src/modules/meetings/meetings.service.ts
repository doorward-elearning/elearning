import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import MeetingsRepository from '@doorward/backend/repositories/meetings.repository';
import UserEntity from '@doorward/common/entities/user.entity';
import MeetingEntity from '@doorward/common/entities/meeting.entity';
import { MeetingRoomsService } from '../meeting-rooms/meeting-rooms.service';
import { OpenviduWebHookEvents } from '@doorward/common/types/openvidu';
import { ORGANIZATION } from '../../bootstrap/organizationSetup';
import { MeetingStatus } from '@doorward/common/types/meeting';
import { MeetingResponse } from '@doorward/common/dtos/response/meetings.responses';
import { OpenviduWebHookBody } from '@doorward/common/dtos/body/openvidu.body';
import Tools from '@doorward/common/utils/Tools';
import translate from '@doorward/common/lang/translate';
import { merge } from 'lodash';

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

      return this.joinJitsiMeeting(meeting, currentUser);
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
   * @param user
   */
  public async joinJitsiMeeting(meeting: MeetingEntity, user?: UserEntity) {
    const isModerator = await user.hasPrivileges('meetings.moderate');
    const isPublisher = await user.hasPrivileges('meetings.publish');

    return {
      user,
      meeting,
      config: await this.buildJitsiConfig(isModerator, isPublisher),
      interfaceConfig: await this.buildJitsiInterfaceConfig(isModerator, isPublisher),
    };
  }

  public async buildJitsiInterfaceConfig(isModerator: boolean, isPublisher: boolean) {
    const { base, moderator, publisher, subscriber } = ORGANIZATION.meetings.interface;

    if (isModerator) {
      return merge({}, base, moderator);
    } else if (isPublisher) {
      return merge({}, base, publisher);
    } else {
      return merge({}, base, subscriber);
    }
  }

  public async buildJitsiConfig(isModerator: boolean, isPublisher: boolean) {
    const { base, moderator, publisher, subscriber } = ORGANIZATION.meetings.config;

    if (isModerator) {
      return merge({}, base, moderator);
    } else if (isPublisher) {
      return merge({}, base, publisher);
    } else {
      return merge({}, base, subscriber);
    }
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
