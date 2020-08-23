import { ObjectSchema } from 'yup';
import { Connection } from 'typeorm';

export default abstract class ApiBody {
  abstract async validation(connection?: Connection): Promise<ObjectSchema>;
}
