import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import UserModel from '@doorward/common/models/user.model';

export default interface PasswordsResetsModel extends BaseOrganizationModel {
  token: string;
  user: UserModel;
}
