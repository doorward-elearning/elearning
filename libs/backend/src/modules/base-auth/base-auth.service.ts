import { Injectable } from '@nestjs/common';
import UserEntity from '@doorward/common/entities/user.entity';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import translate from '@doorward/common/lang/translate';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';

@Injectable()
export class BaseAuthService {
  constructor(private userRepository: UsersRepository) {}

  /**
   * Validate that a user with this username and password exists.
   *
   * @param username
   * @param password
   */
  async validateUserLogin(username: string, password: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.userExistsByUsername(username);

    if (!user) {
      throw new ValidationException({ username: translate('userWithUsernameDoesNotExist') });
    }

    if (!user.password) {
      throw new ValidationException({ password: translate('yourPasswordHasNotBeenSet') });
    }

    if (user.validatePassword(password)) {
      // In order to use entity relations
      return this.userRepository.findOne({ id: user.id });
    } else {
      throw new ValidationException({ password: 'Wrong password.' });
    }
  }
}
