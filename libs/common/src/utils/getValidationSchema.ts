import { ObjectSchema } from 'yup';
import { ClassType } from 'class-transformer/ClassTransformer';
import DApiBody from '@doorward/common/dtos/body/base.body';

const getValidationSchema = async (
  validationSchema: ObjectSchema | ClassType<DApiBody>
): Promise<ObjectSchema | null> => {
  if (!validationSchema) {
    return null;
  }
  try {
    validationSchema = await new (validationSchema as any)().validation();
  } catch (e) {
    return null;
  }

  return validationSchema as ObjectSchema;
};

export default getValidationSchema;
