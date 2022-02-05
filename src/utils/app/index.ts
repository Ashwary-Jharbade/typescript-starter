import Express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import fileUpload from 'express-fileupload';
import config from '../env';

import http from 'http';
const initServer = () => {
  const app = Express();
  app.use(cookieParser());
  app.use(morgan('tiny'));
  app.use(fileUpload());
  app.use(cors());
  app.use(Express.json());
  app.use(Express.static(path.join(__dirname, '../../../media/')));
  app.use(
    Express.urlencoded({
      extended: true
    })
  );
  const { PORT, STAGE } = config;
  http.createServer(app).listen(PORT, () => {
    console.log(`${STAGE} server started at ${PORT}`);
  });
  return app;
};

export default initServer;
