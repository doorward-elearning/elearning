import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { AuthService } from '../auth/auth.service';
import { CreateMeetingBody, CreateMeetingResponse } from '@doorward/backend/dto/openviduBackend';
import MeetingsService from './meetings.service';
import MeetingEntity from '../../database/entities/meeting.entity';
import UserEntity from '../../database/entities/user.entity';

@Controller('meetings')
export class MeetingsController {
  constructor(
    private openviduService: OpenviduService,
    private authService: AuthService,
    private meetingsService: MeetingsService
  ) {}

  /**
   * Creates a session, if the user is a moderator and generates an openvidu token and user session information
   * @param body
   */
  @Post()
  async createSession(@Body() body: CreateMeetingBody): Promise<CreateMeetingResponse> {
    const userSession = await this.meetingsService.createSession(body);
    const jwtToken = await this.authService.generateAccessToken(userSession);

    return {
      ...userSession,
      jwtToken,
    };
  }

  @Get()
  async getMeetings(): Promise<Array<MeetingEntity>> {
    return this.meetingsService.getMeetings();
  }

  @Get(':meetingId')
  async getMeeting(@Param('meetingId') meetingId: string): Promise<MeetingEntity> {
    return this.meetingsService.getMeeting(meetingId);
  }

  @Get(':meetingId/participants')
  async getMeetingParticipants(@Param('meetingId') meetingId: string): Promise<Array<UserEntity>> {
    return this.meetingsService.getMeetingParticipants(meetingId);
  }

  @Delete(':meetingId')
  async endSession(@Param('meetingId') meetingId: string): Promise<string> {
    await this.meetingsService.deleteMeeting(meetingId);
    return 'Meeting ended successfully.';
  }
}
