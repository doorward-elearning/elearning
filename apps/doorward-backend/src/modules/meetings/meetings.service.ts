import { BadRequestException, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import MeetingsRepository from '@doorward/backend/repositories/meetings.repository';
import UserEntity from '@doorward/common/entities/user.entity';
import MeetingEntity from '@doorward/common/entities/meeting.entity';
import { MeetingRoomsService } from '../meeting-rooms/meeting-rooms.service';
import { OpenviduWebHookEvents } from '@doorward/common/types/openvidu';
import { MeetingStatus } from '@doorward/common/types/meeting';
import { MeetingResponse } from '@doorward/common/dtos/response/meetings.responses';
import { OpenviduWebHookBody } from '@doorward/common/dtos/body/openvidu.body';
import Tools from '@doorward/common/utils/Tools';
import translate from '@doorward/common/lang/translate';
import { Request } from 'express';
import { merge } from 'lodash';
import { JitsiService } from '../jitsi/jitsi.service';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { OrganizationConfigKey } from '@doorward/common/types/organizationConfig';
import { Connection } from 'typeorm';
import { ORGANIZATION_CONNECTION } from '@doorward/backend/constants';

@Injectable()
export class MeetingsService {
  constructor(
    @Inject(ORGANIZATION_CONNECTION) private connection: Connection,
    private meetingsRepository: MeetingsRepository,
    private meetingRoomsService: MeetingRoomsService
  ) {}

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
    const organization = (request as any).organization;
    const isModerator = await user.hasPrivileges(this.connection, 'meetings.moderate');
    const isPublisher = await user.hasPrivileges(this.connection, 'meetings.publish');

    let config = await this.buildJitsiConfig(isModerator, isPublisher, organization);

    const interfaceConfig = await this.buildJitsiInterfaceConfig(isModerator, isPublisher, organization);

    config = await this.overrideJitsiConfig(config, meeting, request);

    return {
      user,
      meeting,
      config,
      interfaceConfig,
    };
  }

  public async buildJitsiInterfaceConfig(isModerator: boolean, isPublisher: boolean, organization: OrganizationEntity) {
    const { base, moderator, publisher, subscriber } = JSON.parse(
      organization.getConfiguration(OrganizationConfigKey.MEETING_INTERFACE)
    );

    if (isModerator) {
      return { ...base, ...moderator };
    } else if (isPublisher) {
      return { ...base, ...publisher };
    } else {
      return { ...base, ...subscriber };
    }
  }

  public async buildJitsiConfig(isModerator: boolean, isPublisher: boolean, organization: OrganizationEntity) {
    const { base, moderator, publisher, subscriber } = JSON.parse(
      organization.getConfiguration(OrganizationConfigKey.MEETING)
    );

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
