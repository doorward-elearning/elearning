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
import { Request } from 'express';
import { merge } from 'lodash';
import { JitsiService } from '../jitsi/jitsi.service';

@Injectable()
export class MeetingsService {
  constructor(private meetingsRepository: MeetingsRepository, private meetingRoomsService: MeetingRoomsService) {}

  /**
   *
   * @param meetingId
   * @param request
   * @param currentUser
   */
  public async joinMeeting(meetingId: string, request: Request, currentUser?: UserEntity): Promise<MeetingResponse> {
    const meeting = await this.meetingsRepository.findOne(meetingId, { relations: ['meetingRoom'] });

    const meetingRoom = meeting.meetingRoom;

    if (meetingRoom) {
      if (!currentUser || !(await this.meetingRoomsService.existsInMeetingRoom(meetingRoom.id, currentUser.id))) {
        throw new UnauthorizedException(translate('youAreNotAllowedToJoinMeeting'));
      }

      return this.joinJitsiMeeting(meeting, request, currentUser);
    } else {
      throw new BadRequestException(translate('meetingDoesNotHaveARoom'));
    }
  }

  public async endMeeting(meetingId: string, currentUser: UserEntity) {
    const meeting = await this.meetingsRepository.findOne(meetingId);

    await this.meetingsRepository.update(meeting.id, {
      status: MeetingStatus.ENDED,
    });
  }

  /**
   *
   * @param meeting
   * @param request
   * @param user
   */
  public async joinJitsiMeeting(meeting: MeetingEntity, request: Request, user?: UserEntity) {
    const isModerator = await user.hasPrivileges('meetings.moderate');
    const isPublisher = await user.hasPrivileges('meetings.publish');

    let config = await this.buildJitsiConfig(isModerator, isPublisher);

    const interfaceConfig = await this.buildJitsiInterfaceConfig(isModerator, isPublisher);

    config = await this.overrideJitsiConfig(config, meeting, request);

    return {
      user,
      meeting,
      config,
      interfaceConfig,
    };
  }

  public async buildJitsiInterfaceConfig(isModerator: boolean, isPublisher: boolean) {
    const { base, moderator, publisher, subscriber } = ORGANIZATION.meetings.interface;

    if (isModerator) {
      return { ...base, ...moderator };
    } else if (isPublisher) {
      return { ...base, ...publisher };
    } else {
      return { ...base, ...subscriber };
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

  private async overrideJitsiConfig(currentConfig: object, meeting: MeetingEntity, request: Request) {
    const host = process.env.JITSI_HOST;
    const hostUrl = 'https://' + request.get('host');
    const config = {
      hosts: {
        domain: host,
        muc: `conference.${host}`,
      },
      bosh: `//${host}/http-bind`,
      brandingDataUrl: Tools.joinURL(hostUrl, process.env.API_PREFIX, JitsiService.BRANDING_URL),
      brandingRoomAlias: '',
      callDisplayName: meeting.meetingRoom.title,
    };

    return merge({}, config, currentConfig);
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
