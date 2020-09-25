import * as Yup from 'yup';

export default abstract class DApiBody {
  abstract async validation?(): Promise<Yup.ObjectSchema>;
}
