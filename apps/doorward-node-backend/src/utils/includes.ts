import _ from 'lodash';
import models from '../database/models';
import OrganizationUtils from './OrganizationUtils';

export const UserInclude = [
  {
    model: models.Organization,
    as: 'organization',
  },
  {
    model: models.Role,
    as: 'roles',
    through: { attributes: [] },
  },
];

export const ModuleInclude = [
  {
    model: models.ModuleItem,
    as: 'items',
    include: [
      {
        model: models.Question,
        as: 'questions',
        include: [
          {
            model: models.Answer,
            as: 'answers',
          },
        ],
      },
    ],
  },
];
export const ConferenceInclude = [
  {
    model: models.User,
    as: 'author',
  },
  {
    model: models.Module,
    as: 'modules',
    required: false,
    include: ModuleInclude,
  },
  {
    model: models.User,
    as: 'members',
    required: false,
  },
  {
    model: models.User,
    as: 'managers',
    required: false,
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
];

export const MembersByConference = conferenceId => [
  {
    model: models.Conference,
    as: 'conferences',
    where: {
      id: conferenceId,
    },
  },
];

export const MyConferencesInclude = () =>
  _.merge(ConferenceInclude, [
    {
      model: models.User,
      as: 'author',
      where: {
        organizationId: OrganizationUtils.getId(),
      },
    },
  ]);

export const MemberConferencesInclude = () => {
  return [
    {
      model: models.Conference,
      as: 'conferences',
      include: ConferenceInclude,
      required: false,
    },
  ];
};

export const SchoolInclude = () => {
  return [
    {
      model: models.ClassRoom,
      as: 'classrooms',
      required: false,
      include: [
        {
          model: models.MeetingRoom,
          as: 'meetingRoom',
          required: false,
          include: [
            {
              model: models.Meeting,
              as: 'currentMeeting',
              required: false,
            },
          ],
        },
      ],
    },
  ];
};
