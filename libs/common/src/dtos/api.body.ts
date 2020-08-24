import { ObjectSchema } from 'yup';

export default abstract class ApiBody {
  abstract async validation(): Promise<ObjectSchema>;
}
