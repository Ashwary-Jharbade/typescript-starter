/* eslint-disable @typescript-eslint/no-explicit-any */
const createRecord = async (model: any, payload: any) => {
  const recordInstance = new model(payload);
  const data = await recordInstance.save();
  return data;
};

const findRecord = async (model: any, query = {}) => {
  const data = await model.findOne(query);
  return data;
};

const findAllRecord = async (model: any, query = {}) => {
  const data = await model.find(query);
  return data;
};

const updateRecordByQuery = async (model: any, query: any, payload: any) => {
  const data = await model.findOneAndUpdate(
    query,
    { $set: payload },
    { new: true }
  );
  return data;
};

const pushAttributeInRecord = async (model: any, query: any, payload: any) => {
  const data = await model.findOneAndUpdate(
    query,
    { $push: payload },
    { new: true }
  );
  return data;
};

const removeSubDocsFromRecord = async (
  model: any,
  query: any,
  payload: any
) => {
  const data = await model.findOneAndUpdate(query, { $pull: payload });
  return data;
};

const updateSubDocsInRecord = async (model: any, query: any, payload: any) => {
  const data = await model.findOneAndUpdate(query, payload);
  return data;
};

const deleteRecord = async (model: any, query: any) => {
  const data = await model.deleteOne(query);
  return data;
};

export {
  createRecord,
  updateRecordByQuery,
  deleteRecord,
  pushAttributeInRecord,
  findAllRecord,
  findRecord,
  removeSubDocsFromRecord,
  updateSubDocsInRecord
};
