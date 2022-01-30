import dbInit from './connection';
import {
  save,
  remove,
  update,
  find,
  findAll,
  push,
  pull,
  set
} from './wrapper';

export { dbInit, save, remove, update, find, findAll, push, pull, set };
