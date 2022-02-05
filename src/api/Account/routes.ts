import Express from 'express';
import { createAccount, findAccount, findAllAccount } from './controller';

const accountRouter = Express.Router();

accountRouter.post('/create', createAccount);
accountRouter.get('/findAll', findAllAccount);
accountRouter.get('/find/:id', findAccount);

export default accountRouter;
