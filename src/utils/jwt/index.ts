import jwt from 'jsonwebtoken';
import config from '../env';

const createToken = (payload: any): string => {
  try {
    const token: string = jwt.sign(payload, config.AUTH_KEY, {
      expiresIn: config.TOKEN_EXPIRATION
    });
    return token;
  } catch (error) {
    return '';
  }
};

const validateToken = (token: string): any => {
  try {
    jwt.verify(token, config.AUTH_KEY, (err: any) => {
      if (err) {
        return false;
      }
    });
    const data = jwt.decode(token);
    return data;
  } catch (error) {
    return false;
  }
};

export { createToken, validateToken };
