import { Model } from '@edudoor/common/models/Model';
import { ModuleItem } from '@edudoor/common/models/ModuleItem';
import { Course } from '@edudoor/common/models/Course';

export interface Module extends Model {
  title: string;
  description?: string;
  courseId: string;
  order: number;
  course: Course;
  items: Array<ModuleItem>;
}
