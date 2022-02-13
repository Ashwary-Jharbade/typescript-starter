import { Express, Request, Response } from 'express';
import { FileArray } from 'express-fileupload';
import {
  apiResponse,
  httpConstants,
  localFileUpload
} from '../utils/resuables';
import { contentRouter } from './Content';
import { accountRouter } from './Account';
import { authRouter } from './Auth';
import { isAuthenticated } from '../middleware';

const api = (app: Express) => {
  app.use('/user', authRouter);
  app.use('/content', contentRouter);
  app.use('/account', accountRouter);

  app.post('/thumnails', (req: Request, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(httpConstants.not_found)
        .send('No files were uploaded.');
    }
    const file: { content?: FileArray } = req.files;
    const fileUploadResponse = localFileUpload(file.content, 'thumnails');
    if (fileUploadResponse) {
      return res.status(httpConstants.success).send(fileUploadResponse);
    }
    return res.status(httpConstants.not_found).send('No files were uploaded.');
  });

  app.post('/upload', (req: Request, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(httpConstants.not_found)
        .send('No files were uploaded.');
    }
    const file: { content?: FileArray } = req.files;
    const fileUploadResponse = localFileUpload(file.content, 'content');
    if (fileUploadResponse) {
      return res.status(httpConstants.success).send(fileUploadResponse);
    }
    return res.status(httpConstants.not_found).send('No files were uploaded.');
  });

  app.get('/', isAuthenticated, (req: Request, res: Response) => {
    const code = httpConstants.success;
    return res.status(code).json(apiResponse(code, 'Welocome to Netflix'));
  });

  app.all('*', (req: Request, res: Response) => {
    const code = httpConstants.bad_request;
    return res.status(code).json(apiResponse(code, 'Resource does not exists'));
  });
};

export default api;
