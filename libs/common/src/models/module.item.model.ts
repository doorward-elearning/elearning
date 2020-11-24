import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleModel from '@doorward/common/models/module.model';
import UserModel from '@doorward/common/models/user.model';

export default interface ModuleItemModel extends BaseOrganizationModel {
  title: string;
  type: ModuleItemType;
  order: number;
  module: ModuleModel;
  author: UserModel;
}
