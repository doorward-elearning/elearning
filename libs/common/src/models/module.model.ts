import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import CourseModel from '@doorward/common/models/course.model';
import ModuleItemModel from '@doorward/common/models/module.item.model';

export default interface ModuleModel extends BaseOrganizationModel {
  description: string;
  title: string;
  order: number;
  course: CourseModel;
  items: Array<ModuleItemModel>;
}
