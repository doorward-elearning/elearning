import MeetingRoomsHelper from '../../helpers/MeetingRoomsHelper';

class MeetingRoomsController {
  static async joinMeeting(req) {
    const meetingRoom = await MeetingRoomsHelper.joinMeeting(req.params.id, req);

    return [200, { meetingRoom }];
  }
}

export default MeetingRoomsController;
