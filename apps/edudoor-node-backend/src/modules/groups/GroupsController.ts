import models from '../../database/models';
import GroupHelper from '../../helpers/GroupHelper';
import OrganizationUtils from '@edudoor/common/utils/OrganizationUtils';

class GroupsController {
  static async createGroup(req) {
    const {
      body: { name, members, type },
      user,
    } = req;

    // create the group
    let group = await models.Group.create({
      name,
      createdBy: user.id,
      type,
      organizationId: OrganizationUtils.getId(),
    });

    await GroupHelper.addUsersToGroup(group.id, members, user.id);

    group = await models.Group.findByPk(group.id, {
      include: [
        {
          model: models.User,
          as: 'members',
        },
      ],
    });
    return [201, { group }, 'The group has been created'];
  }

  static async addUserToGroup(req) {
    const {
      body: { members },
      params: { groupId },
      user,
    } = req;

    await GroupHelper.addUsersToGroup(groupId, members, user.id);

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

  static async getGroup(req) {
    const { groupId } = req.params;

    const group = await models.Group.findByPk(groupId, {
      include: [
        {
          model: models.User,
          as: 'members',
          required: false,
        },
      ],
    });

    return [200, { group }];
  }

  static async getGroups(req) {
    const { type } = req.query;

    const where: { type?: string } = {};
    if (type) {
      where.type = type;
    }
    const groups = await models.Group.findAll({
      where,
      include: [
        {
          model: models.User,
          as: 'members',
        },
        {
          model: models.User,
          as: 'creator',
        },
      ],
    });
    return [200, { groups }];
  }
}

export default GroupsController;
