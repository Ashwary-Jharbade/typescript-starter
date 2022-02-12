import path from 'path';
import nconf from 'nconf';
class Config {
  constructor() {
    nconf.argv().env('_');
    const environment = nconf.get('NODE:ENV');
    const envPath = path.join(__dirname, `../../config/${environment}.json`);
    nconf.file(environment, envPath);
    const defaultPath = path.join(__dirname, '../../config/default.json');
    nconf.file('default', defaultPath);
  }
  get(key: string) {
    return nconf.get(key);
  }
}

const confObj = new Config();
export default confObj;
