import models from '../database/models';

class GroupHelper {
  static async addUserToGroup(groupId: string, userId: string) {
    await models.GroupMember.create({
      userId,
      groupId,
    });
  }

  static async addUsersToGroup(groupId: string, members: Array<string>) {
    await Promise.all(
      members.map(async member => {
        return GroupHelper.addUserToGroup(groupId, member);
      })
    );
  }
}

export default GroupHelper;
