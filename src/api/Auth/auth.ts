import { Request, Response } from 'express';
import { AccountModel } from '../Account';
import { httpConstants, apiResponse } from '../../utils/resuables';
import { createToken } from '../../utils/jwt';
import { find, pull, push } from '../../utils/db';

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password, device } = req.body;
    const query = { email, isActive: true };
    const account = await find(AccountModel, query, {});
    let code = httpConstants.bad_request;
    if (!account || !account.auth(password)) {
      return res
        .status(code)
        .json(apiResponse(code, 'Please check email or password'));
    }
    account.activeSessionDevices.forEach((item: any) => {
      if (item.device === device)
        throw `You are already logged in with a ${device} screen`;
    });
    const { accessId } = account;
    const tokenPayload = { accessId };
    const token = createToken(tokenPayload);
    if (!device || !token) {
      throw 'Unable to login';
    }
    await push(AccountModel, query, {
      activeSessionDevices: { device }
    });
    res.header('token', token);
    const response = <never[]>[{ token, accessId, device }];
    code = httpConstants.success;
    return res
      .status(code)
      .json(apiResponse(code, 'Login successfull', response));
  } catch (error) {
    const code = httpConstants.not_found;
    return res.status(code).json(apiResponse(code, `${error}`));
  }
};

const signout = async (req: Request, res: Response) => {
  try {
    const { accessId, device } = req.body;
    const searchQuery = { accessId };
    const deleteQuery = { activeSessionDevices: { device } };
    await pull(AccountModel, searchQuery, deleteQuery);
    const code = httpConstants.success;
    res.setHeader('token', '');
    return res.status(code).json(apiResponse(code, 'Account logged out'));
  } catch (error) {
    const code = httpConstants.not_found;
    return res.status(code).json(apiResponse(code, 'Unable to logout'));
  }
};

export { signin, signout };
