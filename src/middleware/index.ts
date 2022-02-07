import { Request, Response, NextFunction } from 'express';
import { decodeToken, validateToken } from '../utils/jwt';
import { apiResponse, httpConstants } from '../utils/resuables';
import { AccountModel } from '../api/Account';
import { find } from '../utils/db';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.headers?.token || '';
    const isValidated = validateToken(token);
    if (!isValidated) {
      throw 'Email or password incorrect. Please try login again!';
    }
    next();
  } catch (error) {
    const code = httpConstants.bad_request;
    return res
      .status(code)
      .json(
        apiResponse(
          code,
          'Email or password incorrect. Please try login again!'
        )
      );
  }
};

const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = <string>req.headers?.token;
    const { tokenId } = decodeToken(token);
    const account = await find(
      AccountModel,
      { _id: tokenId, isActive: true },
      {}
    );
    let code = httpConstants.not_found;
    if (!account) {
      return res.status(code).json(apiResponse(code, 'Account deactivated'));
    }
    if (account?.role === 'root') {
      return next();
    }
    code = httpConstants.unauthorized;
    return res
      .status(code)
      .json(apiResponse(code, 'Unauthorized access restricted'));
  } catch (error) {
    const code = httpConstants.unauthorized;
    return res
      .status(code)
      .json(apiResponse(code, 'Unauthorized access restricted'));
  }
};

export { isAuthenticated, isAuthorized };
