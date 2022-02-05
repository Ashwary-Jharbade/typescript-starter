import confObj from '../../config';

const config = {
  STAGE: confObj.get('stage'),
  PORT: confObj.get('express:port'),
  DB_NAME: confObj.get('db:db_name'),
  DB_URI: confObj.get('db:db_path'),
  AUTH_KEY: confObj.get('auth:key'),
  TOKEN_EXPIRATION: confObj.get('auth:expires')
};

export default config;
