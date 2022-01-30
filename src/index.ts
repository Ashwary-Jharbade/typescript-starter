import api from './api';
import initServer from './utils/app';
import { dbInit } from './utils/db/index';

dbInit();
const app = initServer();
api(app);
