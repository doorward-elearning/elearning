import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('meeting-rooms')
@ApiTags('meetingRooms')
export class MeetingRoomsController {}
