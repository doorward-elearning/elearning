import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import Public from '@doorward/backend/decorators/public.decorator';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
import { MeetingsService } from './meetings.service';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import MeetingEntity from '@doorward/common/entities/meeting.entity';
import { MeetingResponse } from '@doorward/common/dtos/response/meetings.responses';
import { OpenviduWebHookBody } from '@doorward/common/dtos/body/openvidu.body';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import TransformerGroups from '@doorward/backend/decorators/transformer.groups.decorator';
import translate from '@doorward/common/lang/translate';

const MeetingExists = () =>
  ModelExists({
    key: 'meetingId',
    model: MeetingEntity,
    message: translate.meetingDoesNotExist(),
  });

@Controller('meetings')
@ApiTags('meetings')
@UseGuards(JwtAuthGuard)
export class MeetingsController {
  constructor(private meetingsService: MeetingsService) {}

  @Get(':meetingId/join')
  @Public()
  @MeetingExists()
  @ApiResponse({
    type: MeetingResponse,
    status: HttpStatus.OK,
    description: 'The meeting response',
  })
  @TransformerGroups('fullUserProfile')
  async joinMeeting(
    @Param('meetingId') meetingId: string,
    @CurrentUser() currentUser: UserEntity,
    @Req() request
  ): Promise<MeetingResponse> {
    return await this.meetingsService.joinMeeting(meetingId, request, currentUser);
  }

  @Delete(':meetingId')
  @MeetingExists()
  async endMeeting(@Param('meetingId') meetingId: string, @CurrentUser() user: UserEntity) {
    await this.meetingsService.endMeeting(meetingId, user);

    return {
      message: translate.meetingHasEnded(),
    };
  }

  @Get('openvidu/webhook')
  @Public()
  async processOpenviduWebHook(@Body() body: OpenviduWebHookBody) {
    await this.meetingsService.processOpenviduWebHook(body);
  }
}
