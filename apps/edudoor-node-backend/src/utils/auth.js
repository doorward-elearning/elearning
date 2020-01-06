import jwt from 'jsonwebtoken';
import { environment } from '../environments/environment';

const JWT_SECRET = environment.JWT_SECRET_KEY;

const EXPIRY = environment.TOKEN_EXPIRY || '360h';

export default class JWT {
  static generate(user = {}) {
    return jwt.sign(
      {
        ...user,
      },
      JWT_SECRET,
      {
        expiresIn: EXPIRY,
        algorithm: 'HS256',
      }
    );
  }

  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err);
        }
        resolve(decodedToken);
      });
    });
  }
}
