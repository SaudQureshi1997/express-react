import mongoose from "mongoose";

export const update = (modelName, query, data) => {
  const bulk = mongoose.model(modelName).collection.initializeOrderedBulkOp();
  bulk.find(query).update({ $set: data });
  return bulk.execute();
};
