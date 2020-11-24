import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import UserModel from '@doorward/common/models/user.model';

export default interface FileModel extends BaseOrganizationModel {
  name: string;
  public: boolean;
  publicUrl: string;
  owner: UserModel;
}
