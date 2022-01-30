import confObj from '../config';

const config = {
  PORT: confObj.get('express:port')
};

export default config;
