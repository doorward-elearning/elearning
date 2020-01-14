import models from '../database/models';

class GroupHelper {
  static async addUserToGroup(groupId: string, userId: string, addedBy: string) {
    await models.GroupMember.create({
      userId,
      groupId,
      addedBy,
    });
  }

  static async addUsersToGroup(groupId: string, members: Array<string>, addedBy: string) {
    await Promise.all(
      members.map(async member => {
        return GroupHelper.addUserToGroup(groupId, member, addedBy);
      })
    );
  }
}

export default GroupHelper;
