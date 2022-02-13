import Express from 'express';
import {
  createContent,
  streamContent,
  findSingleMediaContent,
  findAllMediaContent,
  addContent
} from './controllers';

const contentRouter = Express.Router();

contentRouter.post('/create', createContent);
contentRouter.get('/stream/:id', streamContent);
contentRouter.put('/addContent/:id/:episodeId', addContent);
contentRouter.get('/find/:id', findSingleMediaContent);
contentRouter.get('/findAll', findAllMediaContent);

export default contentRouter;
