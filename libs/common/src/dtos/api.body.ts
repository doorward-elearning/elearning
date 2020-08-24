import * as Yup from 'yup';

export default abstract class ApiBody {
  abstract async validation(): Promise<Yup.ObjectSchema>;
}
