import functions from 'firebase-functions';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'src/dto/jwt.dto';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const secretKey: string = process.env.JWT_SECRET;

const sign = (user: { code: number; name: string }): string => {
  const payload: JwtPayload = {
    user: { code: user.code, name: user.name || null },
  };
  const accessToken: string = jwt.sign(payload, secretKey, { expiresIn: '3d' });
  return accessToken;
};

const refresh = (user: { code: number; name: string }): string => {
  const payload: JwtPayload = {
    user: { code: user.code, name: user.name || null },
  };

  const refreshToken: string = jwt.sign(payload, secretKey, {
    expiresIn: '30d',
  });

  return refreshToken;
};

const verify = (token: string): any => {
  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, secretKey);
  } catch (err) {
    if (err.message === 'jwt expired') {
      console.log('expired token');
      functions.logger.error('expired token');
      return TOKEN_EXPIRED;
    } else if (err.message === 'invalid token') {
      console.log('invalid token');
      functions.logger.error('invalid token');
      return TOKEN_INVALID;
    } else {
      console.log('invalid token');
      functions.logger.error('invalid token');
      return TOKEN_INVALID;
    }
  }
  return decoded;
};

export default { sign, refresh, verify };
