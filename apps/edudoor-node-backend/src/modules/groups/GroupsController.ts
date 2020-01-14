import models from '../../database/models';
import GroupHelper from '../../helpers/GroupHelper';

class GroupsController {
  static async createGroup(req) {
    const {
      body: { name, members },
    } = req;

    // create the group
    const group = await models.Group.create(
      {
        name,
      },
      {
        include: [
          {
            model: models.User,
            as: 'members',
          },
        ],
      }
    );

    await GroupHelper.addUsersToGroup(group.id, members);

    await group.reload();
    return [201, group, 'The group has been created'];
  }

  static async addUserToGroup(req) {
    const {
      body: { members },
      params: { groupId },
    } = req;

    await GroupHelper.addUsersToGroup(groupId, members);

    const group = await models.Group.findByPk(groupId, {
      include: [
        {
          model: models.User,
          as: 'members',
        },
      ],
    });
    return [201, group, 'Users have been added to the group'];
  }

  static async getGroups() {
    const groups = await models.Group.findAll({
      include: [
        {
          model: models.User,
          as: 'members',
        },
      ],
    });
    return [200, { groups }];
  }
}

export default GroupsController;
