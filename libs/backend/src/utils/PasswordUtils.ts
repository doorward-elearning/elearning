import * as bcrypt from 'bcrypt';

export default class PasswordUtils {
  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, +process.env.BCRYPT_PASSWORD_SALT);
  }

  static verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
