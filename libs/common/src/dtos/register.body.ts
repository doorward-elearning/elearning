import ApiBody from '@doorward/common/dtos/api.body';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { UsersRepository } from '../../../../apps/doorward-backend/src/modules/users/users.repository';

export default class RegisterBody extends ApiBody {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  async validation(connection?: Connection): Promise<ObjectSchema<object>> {
    return Yup.object({
      username: Yup.string()
        .required('Username is required')
        .nullable()
        .test('existing-user', 'This username is already in use.', async (value) => {
          if (connection) {
            const user = await connection.getCustomRepository(UsersRepository).findOne({
              username: value,
            });
            return !user;
          }
          return true;
        }),
      password: Yup.string().required('Password is required').nullable(),
      email: Yup.string().required('Email is required').email('Please enter a valid email').nullable(),
    });
  }
}
