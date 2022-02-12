import { Request, Response } from 'express';
import AccountModel from './schema';
import { save, find, findAll } from '../../utils/db';
import { apiResponse, httpConstants } from '../../utils/resuables';

const createAccount = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const role = 'root';
    let code = httpConstants.created;
    if (body.role === role) {
      const query = { role: role, group: role, isActive: true };
      const account = await find(AccountModel, query, {});
      if (account) {
        code = httpConstants.bad_request;
        return res
          .status(code)
          .json(apiResponse(code, 'Root account already exists'));
      }
    }
    const data = await save(AccountModel, body);
    return res
      .status(code)
      .json(apiResponse(code, 'Account created successfully', data));
  } catch (error) {
    const code = httpConstants.not_found;
    return res.status(code).json(apiResponse(code, 'Account creation failed'));
  }
};

const findAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = { _id: id };
    const data = await find(AccountModel, query, {});
    const code = httpConstants.created;
    return res.status(code).json(apiResponse(code, 'Found one account', data));
  } catch (error) {
    const code = httpConstants.not_found;
    return res.status(code).json(apiResponse(code, 'No account found'));
  }
};

const findAllAccount = async (req: Request, res: Response) => {
  try {
    const data = await findAll(AccountModel, {}, {});
    const code = httpConstants.created;
    return res.status(code).json(apiResponse(code, 'Found accounts', data));
  } catch (error) {
    const code = httpConstants.not_found;
    return res.status(code).json(apiResponse(code, 'No account found'));
  }
};

export { createAccount, findAccount, findAllAccount };