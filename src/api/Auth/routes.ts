import Express from 'express';
import { signin, signout } from './auth';

const authRouter = Express.Router();

authRouter.post('/login', signin);
authRouter.post('/logout', signout);

export default authRouter;
