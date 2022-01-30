import { Express, Request, Response } from 'express';
import { apiResponse, httpConstants } from '../utils/resuables';

const api = (app: Express) => {
  app.all('*', (req: Request, res: Response) => {
    const code = httpConstants.bad_request;
    res.status(code).json(apiResponse(code, 'Resource does not exists'));
  });
};

export default api;
