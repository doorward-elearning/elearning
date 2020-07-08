import models from '../../database/models';
import Emails from '../../utils/Emails';
import MeetingRoomsHelper from '../../helpers/MeetingRoomsHelper';
import { SchoolInclude } from '../../utils/includes';

class SchoolsController {
  static async createSchool(req) {
    const {
      body: { email, name, phoneNumber },
    } = req;

    const school = await models.School.create({
      email,
      name,
      phoneNumber,
    });

    Emails.schoolCreated(school);

    return [200, { school }, 'School has been created. You can now create classrooms for the school.'];
  }

  static async createClassroom(req) {
    const {
      params: { schoolId },
      body: { name },
    } = req;

    const meetingRoom = await models.MeetingRoom.create(
      {
        title: name,
      },
      {
        include: [
          {
            model: models.Meeting,
            as: 'currentMeeting',
          },
        ],
      }
    );

    const classroom = await models.ClassRoom.create({
      name,
      meetingRoomId: meetingRoom.id,
      schoolId,
    });

    await MeetingRoomsHelper.createMeeting(meetingRoom.id);

    await meetingRoom.reload();

    const school = await models.School.findByPk(schoolId, {
      include: SchoolInclude(),
    });

    return [200, { school }, 'Classroom has been created. You can now start/join a meeting.'];
  }

  static async fetchSchools() {
    const schools = await models.School.findAll({
      include: SchoolInclude(),
    });

    return [200, { schools }];
  }

  static async fetchSchool(req) {
    const { schoolId } = req.params;

    const school = await models.School.findByPk(schoolId, {
      include: SchoolInclude(),
    });

    return [200, { school }];
  }
}

export default SchoolsController;
