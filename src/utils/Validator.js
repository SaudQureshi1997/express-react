import niv from "node-input-validator";
import mongoose from "mongoose";

niv.bailable(false);

niv.extend("unique", async ({value, args}) => {
  let modelName = args[0];
  let columnName = args[1];
  const query = {};
  query[columnName] = value;
  if (args[2]) {
    query['_id'] = {$ne: mongoose.Types.ObjectId(args[2])};
  }
  const response = await mongoose
    .model(modelName)
    .findOne(query);

  return response === null;
});

niv.extend("exists", async ({value, args}) => {
  let modelName = args[0];
  let columnName = args[1];
  const query = {};
  query[columnName] = value;
  if (args[2]) {
    query['_id'] = {$ne: mongoose.Types.ObjectId(args[2])};
  }
  const response = await mongoose
    .model(modelName)
    .findOne(query);

  return response !== null;
});

niv.extendMessages({
  unique: "The :attribute already exists in the database",
  exists: "The :attribute does not exist in the database",
});

const formatter = (errors) => {
  const formatted = {};
  Object.keys(errors).forEach((errorKey) => {
    formatted[errorKey] = errors[errorKey].map((error) => error.message);
  });
  return formatted;
};

export default async (body, rules) => {
  const v = new niv.Validator(body, rules);

  if (await v.fails()) {
    return formatter(v.errors);
  }
};
