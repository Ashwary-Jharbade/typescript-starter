import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwt';
import { apiResponse, httpConstants } from '../utils/resuables';
import { AccountModel } from '../api/Account';
import { find } from '../utils/db';

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = <string>req.headers?.token;
    if (!token) {
      const code = httpConstants.bad_request;
      return res.status(code).json(apiResponse(code, 'User logged out'));
    }
    const userData = validateToken(token);
    if (userData) {
      const account = await find(
        AccountModel,
        { _id: userData?.tokenId, isActive: true },
        {}
      );
      if (account) {
        return next();
      }
    }
    const code = httpConstants.bad_request;
    return res.status(code).json(apiResponse(code, 'User logged out'));
  } catch (error) {
    console.log(error);
    const code = httpConstants.not_found;
    return res.status(code).json(apiResponse(code, 'Unable to process'));
  }
};

export { isAuthenticated };
