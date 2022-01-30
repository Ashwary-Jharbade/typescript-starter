import confObj from '../../config';

const config = {
  STAGE: confObj.get('stage'),
  PORT: confObj.get('express:port'),
  DB_NAME: confObj.get('db:db_name'),
  DB_URI: confObj.get('db:db_path')
};

export default config;
