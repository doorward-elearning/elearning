import models from '../database/models';
import { GroupMember } from '@doorward/common/models/GroupMember';

class GroupHelper {
  static async addUserToGroup(groupId: string, userId: string, addedBy: string) {
    await models.GroupMember.findOrCreate({
      where: {
        userId,
        groupId,
      },
      defaults: {
        userId,
        groupId,
        addedBy,
      },
    });
  }

  static async addUsersToGroup(groupId: string, members: Array<string>, addedBy: string) {
    await Promise.all(
      members.map(async member => {
        return GroupHelper.addUserToGroup(groupId, member, addedBy);
      })
    );
  }

  static async removeUsersFromGroup(groupId: string, members: Array<GroupMember>) {
    await Promise.all(
      members.map(async member => {
        return member.destroy();
      })
    );
  }
}

export default GroupHelper;
