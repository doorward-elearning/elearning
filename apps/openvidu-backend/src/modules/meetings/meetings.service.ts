import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { AuthService } from '../auth/auth.service';
import { CreateMeetingBody } from '@doorward/backend/dto/openviduBackend';
import { OPENVIDU_ROLES, SessionLogo } from '@doorward/common/types/openvidu';
import { InjectRepository } from '@nestjs/typeorm';
import MeetingEntity from '../../database/entities/meeting.entity';
import { In, Repository } from 'typeorm';
import { CapabilityEntity } from '../../database/entities/capability.entity';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import UserEntity from '../../database/entities/user.entity';

@Injectable()
export default class MeetingsService {
  constructor(
    private openviduService: OpenviduService,
    private authService: AuthService,
    @InjectRepository(MeetingEntity) private meetingRepository: Repository<MeetingEntity>,
    @InjectRepository(CapabilityEntity) private capabilityRepository: Repository<CapabilityEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  private static extractLogo(logo: SessionLogo): { dark: string; base: string } {
    if (logo) {
      if ((logo as string).substring) {
        const logoString = logo as string;
        return { dark: logoString, base: logoString };
      } else {
        return logo as { dark: string; base: string };
      }
    }
    return { dark: '', base: '' };
  }

  static handleError(error: AxiosError) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const statusCode = error.response?.status || error.status;

    if (error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT' || (error.code || '').includes('SELF_SIGNED_CERT')) {
      throw new HttpException(
        'ERROR: Self signed certificate Visit ' + process.env.OPENVIDU_URL,
        HttpStatus.UNAUTHORIZED
      );
    } else {
      throw new HttpException(
        error.message || 'ERROR: Cannot connect with OpenVidu Server',
        statusCode || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  async createSession(body: CreateMeetingBody) {
    const { sessionId, user, logoUrl, capabilities, moderatorCapabilities } = body;
    try {
      if (await this.openviduService.sessionExists(sessionId)) {
        throw new HttpException('Could not create meeting session as it already exists.', HttpStatus.CONFLICT);
      } else if (user.role === OPENVIDU_ROLES.MODERATOR) {
        const { id } = await this.openviduService.createSession(sessionId);
        const logo = MeetingsService.extractLogo(logoUrl);
        // create the meeting.
        const meeting = this.meetingRepository.create({
          sessionId: id,
          logo: logo.base,
          darkThemeLogo: logo.dark,
          capabilities: await this._getCapabilities(capabilities),
        });

        await this.meetingRepository.save(meeting);

        const [screenToken, webcamToken] = await this._createTokens(sessionId, user.role, 2);
        const userEntity = this.userRepository.create({
          fullName: user.name,
          avatar: user.avatar,
          role: user.role,
          data: user.data,
          screenToken,
          webcamToken,
          raisingHand: false,
          capabilities: await this._getCapabilities([...moderatorCapabilities]),
          meeting,
        });

        return this.userRepository.save(userEntity);
      } else {
        throw new HttpException('You do not have permissions to start this meeting.', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      MeetingsService.handleError(error);
    }
  }

  async deleteMeeting(meetingId: string): Promise<any> {
    const meeting = await this.meetingRepository.findOneOrFail({ id: meetingId });
    await this.meetingRepository.remove(meeting);
    const sessionId = meeting.sessionId;
    if (await this.openviduService.sessionExists(sessionId)) {
      await this.openviduService.deleteSession(sessionId);
    }
  }

  async getMeeting(meetingId: string): Promise<MeetingEntity> {
    return this.meetingRepository.findOneOrFail(meetingId, {
      relations: ['capabilities', 'participants', 'whiteboards'],
    });
  }

  async getMeetingParticipants(meetingId: string): Promise<Array<UserEntity>> {
    return this.userRepository.find({
      where: {
        meeting: {
          id: meetingId,
        },
      },
      relations: ['capabilities'],
    });
  }

  async getMeetings(): Promise<Array<MeetingEntity>> {
    return this.meetingRepository.find();
  }

  private async _getCapabilities(capabilities: Array<MeetingCapabilities>): Promise<Array<CapabilityEntity>> {
    return await this.capabilityRepository.find({
      where: {
        capability: In(capabilities),
      },
    });
  }

  private async _createTokens(sessionId: string, role: OPENVIDU_ROLES, numTokens: number): Promise<Array<string>> {
    return Promise.all(
      Array(numTokens)
        .fill(0)
        .map(async () => {
          return (
            await this.openviduService.createToken({
              session: sessionId,
              role,
            })
          ).token;
        })
    );
  }
}
