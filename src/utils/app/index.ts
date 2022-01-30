import Express from 'express';
import config from '../env';

import http from 'http';
const initServer = () => {
  const app = Express();
  const { PORT, STAGE } = config;
  http.createServer(app).listen(PORT, () => {
    console.log(`${STAGE} server started at ${PORT}`);
  });
  return app;
};

export default initServer;
