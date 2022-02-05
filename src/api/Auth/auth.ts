import { Request, Response } from 'express';
import { AccountModel } from '../Account';
import { httpConstants, apiResponse, setDate } from '../../utils/resuables';
import { createToken } from '../../utils/jwt';
import { find } from '../../utils/db';
import config from '../../utils/env';

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const query = { email, isActive: true };
    const account = await find(AccountModel, query, {});
    let code = httpConstants.bad_request;
    if (!account && !account.auth(password)) {
      return res
        .status(code)
        .json(apiResponse(code, 'Please check email or password'));
    }
    const { _id, role } = account;
    const tokenPayload = { tokenId: _id };
    const token = createToken(tokenPayload);
    if (!token) {
      throw 'Unable to login';
    }
    // const date = setDate(new Date(), config.TOKEN_EXPIRATION, 30, 5);
    // res.cookie('account', token, {
    //   expires: date
    // });
    res.header('token', token);
    const response = <never[]>[{ token, email, role }];
    code = httpConstants.success;
    return res
      .status(code)
      .json(apiResponse(code, 'Login successfull', response));
  } catch (error) {
    const code = httpConstants.not_found;
    return res
      .status(code)
      .json(apiResponse(code, `Unable to login: ${error}`));
  }
};

const signout = (req: Request, res: Response) => {
  try {
    // res.clearCookie('account');
    res.setHeader('token', '');
    const code = httpConstants.success;
    return res.status(code).json(apiResponse(code, 'Account logged out'));
  } catch (error) {
    const code = httpConstants.not_found;
    return res.status(code).json(apiResponse(code, 'Unable to login'));
  }
};

export { signin, signout };
