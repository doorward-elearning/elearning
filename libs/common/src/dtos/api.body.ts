import { ObjectSchema } from 'yup';

export default interface ApiBody {
  validation(): ObjectSchema;
}
