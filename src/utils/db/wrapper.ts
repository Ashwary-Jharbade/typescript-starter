/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createRecord,
  updateRecordByQuery,
  deleteRecord,
  pushAttributeInRecord,
  findAllRecord,
  findRecord,
  removeSubDocsFromRecord,
  updateSubDocsInRecord
} from './transaction';

const save = (model: any, data: any) => {
  return createRecord(model, data);
};

const find = (model: any, query: any, properties: any) => {
  return findRecord(model, query, properties);
};

const findAll = (model: any, query: any, properties: any) => {
  return findAllRecord(model, query, properties);
};

const update = (model: any, query: any, data: any) => {
  return updateRecordByQuery(model, query, data);
};

const push = (model: any, query: any, data: any) => {
  return pushAttributeInRecord(model, query, data);
};

const remove = (model: any, query: any) => {
  return deleteRecord(model, query);
};

const pull = (model: any, query: any, payload: any) => {
  return removeSubDocsFromRecord(model, query, payload);
};

const set = (model: any, query: any, payload: any) => {
  return updateSubDocsInRecord(model, query, payload);
};

export { save, remove, update, find, findAll, push, pull, set };
