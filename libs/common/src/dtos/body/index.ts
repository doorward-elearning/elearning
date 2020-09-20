import * as Yup from 'yup';
export * from './auth.body';
export * from './course.managers.body';
export * from './courses.body';
export * from './groups.body';
export * from './modules.body';
export * from './module.items.body';
export * from './students.body';
export * from './users.body';

export default abstract class DApiBody {
  abstract async validation(): Promise<Yup.ObjectSchema>;
}
