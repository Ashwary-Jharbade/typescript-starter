import Mongoose from 'mongoose';
import config from '../env';

const dbInit = () => {
  const { DB_URI, DB_NAME } = config;
  const URI = DB_URI + DB_NAME;
  Mongoose.connect(URI, (err) => {
    if (err) {
      console.log('DB connection failed', err);
      process.exit(0);
    }
    console.log('DB Started');
  });
};

export default dbInit;
