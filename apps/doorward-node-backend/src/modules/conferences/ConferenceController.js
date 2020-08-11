import Sequelize from 'sequelize';
import models from '../../database/models';
import { ConferenceInclude, MemberConferencesInclude } from '../../utils/includes';
import ModulesController from './modules/ModulesController';
import ModulesHelper from '../../helpers/ModulesHelper';
import ConferenceHelper from '../../helpers/ConferenceHelper';
import Tools from '../../utils/Tools';
import MeetingRoomsHelper from '../../helpers/MeetingRoomsHelper';
import Socket from '../../websocket/Socket';
import { LIVE_CLASSROOM_STARTED } from '../../websocket/types';
import OpenViduHelper from '../../helpers/OpenViduHelper';

class ConferenceController {
  static async createConference(req) {
    const {
      body: { modules, ...other },
      user: { id: userId },
    } = req;

    const conference = await models.Conference.create(
      { ...other, createdBy: userId },
      {
        include: ConferenceInclude,
      }
    );

    await Promise.all(
      modules.map(async module => {
        return ModulesController.createModule(conference.id, module);
      })
    );

    await conference.reload();

    return [201, { conference }, 'Conference created successfully'];
  }

  static async updateConferenceModules(req) {
    const { body, params } = req;
    const { modules } = body;

    await Promise.all(modules.map(ModulesHelper.updateModule));

    const { modules: updatedModules } = await ConferenceHelper.getConference(params.conferenceId);

    return [200, { modules: updatedModules }, 'Modules have been updated.'];
  }

  static async updateConference(req) {
    const {
      body: { ...other },
      params: { conferenceId },
    } = req;

    const conference = (
      await models.Conference.update(
        { ...other },
        {
          where: { id: conferenceId },
          include: ConferenceInclude,
          returning: true,
        }
      )
    )[1][0];
    await conference.reload();

    return [200, { conference }, 'Conference has been updated.'];
  }

  static async getConferences(req) {
    const { user } = req;

    let conferences;
    if (Tools.isMember(user)) {
      // eslint-disable-next-line prefer-destructuring
      conferences = (
        await models.User.findByPk(user.id, {
          include: MemberConferencesInclude(),
        })
      ).conferences;
    } else {
      const managed = await models.Conference.findAll({
        include: [
          {
            model: models.User,
            as: 'managers',
            where: {
              id: user.id,
            },
          },
        ],
      });
      conferences = await models.Conference.findAll({
        includeIgnoreAttributes: false,
        include: [
          {
            model: models.User,
            as: 'members',
            attributes: [],
            required: false,
            subQuery: true,
          },
          {
            model: models.User,
            as: 'author',
            where: Tools.isAdmin(user) ? {} : { id: user.id },
            attributes: [],
            required: !managed.length,
          },
          {
            model: models.User,
            as: 'managers',
            where: {
              id: user.id,
            },
            required: managed.length,
          },
          {
            model: models.MeetingRoom,
            as: 'meetingRoom',
            required: false,
            include: [
              {
                model: models.Meeting,
                as: 'currentMeeting',
                where: {
                  status: 'STARTED',
                },
              },
            ],
          },
        ],
        attributes: {
          include: [[Sequelize.fn('COUNT', Sequelize.col('members.id')), 'numMembers']],
        },
        group: ['Conference.id'],
        order: [['createdAt', 'desc']],
      });
    }

    conferences = await Promise.all(
      conferences.map(async conference => {
        if (conference.meetingRoomId) {
          conference.dataValues.meetingRoom = await models.MeetingRoom.findByPk(conference.meetingRoomId, {
            include: [
              {
                model: models.Meeting,
                as: 'currentMeeting',
                where: {
                  status: 'STARTED',
                },
              },
            ],
          });
        }
        return conference;
      })
    );

    return [200, { conferences }];
  }

  static async getConference(req) {
    const {
      params: { conferenceId },
    } = req;
    const conference = await ConferenceHelper.getConference(conferenceId);

    conference.dataValues.itemCount = ConferenceHelper.conferenceItemStats(conference);
    // check meeting
    const meeting = conference.meetingRoom?.currentMeeting;
    if (meeting) {
      if (meeting.status === 'STARTED') {
        try {
          await OpenViduHelper.getToken(meeting.sessionId);
        } catch (e) {
          conference.meetingRoom.currentMeeting = null;
          await models.Meeting.update(
            { status: 'ENDED' },
            {
              where: {
                id: meeting.id,
              },
            }
          );
        }
      }
    }

    return [200, { conference }];
  }

  static async startMeeting(req) {
    const { params, user } = req;

    const conference = await ConferenceHelper.createMeetingRoom(params.conferenceId, user.id);

    const { meetingRoom } = conference;

    if (!(await models.Meeting.findOne({ where: { meetingRoomId: meetingRoom.id, status: 'STARTED' } }))) {
      await MeetingRoomsHelper.createMeeting(meetingRoom.id, user.id);
    }

    const members = await ConferenceHelper.getMembersForConference(conference.id);

    Socket.send(members, LIVE_CLASSROOM_STARTED, {
      conferenceId: conference.id,
    });

    return ConferenceHelper.joinConferenceMeetingRoom(meetingRoom, user);
  }

  static async joinMeeting(req) {
    const { params, user } = req;
    const conference = await models.Conference.findByPk(params.conferenceId);

    const meetingRoom = await models.Meeting.findOne({
      where: {
        conferenceId: conference.id,
        status: 'STARTED',
      },
    });
    return ConferenceHelper.joinMeeting(conference, meetingRoom, user);
  }

  static async deleteConference(req) {
    const {
      params: { conferenceId },
    } = req;

    await models.Conference.destroy({ where: { id: conferenceId } });

    return [200, undefined, 'Conference has been deleted.'];
  }
}

export default ConferenceController;
