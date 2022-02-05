import Express from 'express';
import {
  createContent,
  streamContent,
  findSingleMediaContent,
  findAllMediaContent
} from './controllers';

const contentRouter = Express.Router();

contentRouter.post('/create', createContent);
contentRouter.get('/stream/:id', streamContent);
contentRouter.get('/find/:id', findSingleMediaContent);
contentRouter.get('/findAll', findAllMediaContent);

export default contentRouter;
