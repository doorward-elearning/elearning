import models from '../../database/models';
import GroupHelper from '../../helpers/GroupHelper';
import OrganizationUtils from '../../utils/OrganizationUtils';
import compareLists from '@doorward/common/utils/compareLists';
import { searchQuery } from '../../utils/query';

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

  static async updateGroupMembers(req) {
    const {
      body: { members, name },
      user,
      params: { groupId },
    } = req;

    const existingUsers = await models.GroupMember.findAll({
      where: {
        groupId,
      },
    });

    const { newItems, removed } = compareLists(existingUsers, members as Array<string>, (a, b) => a.userId === b);

    await GroupHelper.addUsersToGroup(groupId, newItems, user.id);
    await GroupHelper.removeUsersFromGroup(groupId, removed);

    const group = await models.Group.findByPk(groupId, {
      include: [
        {
          model: models.User,
          as: 'members',
        },
      ],
    });

    await group.update({ name });
    await group.reload();

    return [200, { group }, 'Group has been updated.'];
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

    const search = searchQuery(req, ['name']);

    const where: { [name: string]: string } = { ...search };
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
