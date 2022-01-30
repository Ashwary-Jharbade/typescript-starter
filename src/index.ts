import Express from 'express';
import { Request, Response } from 'express';
import http from 'http';
import config from './keys';
const app = Express();
const PORT = config.PORT;
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Request for / succeeded');
});
http.createServer(app).listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
