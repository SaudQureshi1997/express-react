import Todo from "@models/todo.js";
import Validator from "@utils/validator.js";
import * as updater from "@utils/bulkUpdater.js";
import mongoose from "mongoose";

export const index = async ({ req, res }) => {
  const todos = await Todo.findByUserId(req.user.data._id);

  return res.json({ todos });
};

export const store = async ({ req, res }) => {
  const errors = await Validator(req.body, {
    name: "required|minLength:5|maxLength:100|unique:todo,name",
  });

  if (errors) {
    return res.validationError(errors);
  }

  const todo = await Todo.create({
    name: req.body.name,
    user_id: req.user.data._id,
  });

  return res.json({ todo });
};

export const complete = async ({ req, res }) => {
  const errors = await Validator(req.body, {
    ids: "required|arrayUnique",
  });
  if (errors) {
    return res.validationError({ errors });
  }
  const ids = req.body.ids.map((id) => mongoose.Types.ObjectId(id));
  await updater.update(
    "todo",
    {
      user_id: mongoose.Types.ObjectId(req.user.data._id),
      _id: { $in: ids },
    },
    { completed: true }
  );

  return res.json({ message: "Marked as completed" });
};

export const archive = async ({ req, res }) => {
  const errors = await Validator(req.body, {
    ids: "required|arrayUnique",
  });
  if (errors) {
    return res.validationError({ errors });
  }
  const ids = req.body.ids.map((id) => mongoose.Types.ObjectId(id));
  await updater.update(
    "todo",
    { user_id: mongoose.Types.ObjectId(req.user.data._id), _id: { $in: ids } },
    { archived: true }
  );

  return res.json({ message: "Marked as archived" });
};

export const setPriority = async ({ req, res }) => {
  const errors = await Validator(req.body, {
    ids: "required|arrayUnique",
    number: "required|integer",
  });
  if (errors) {
    return res.validationError({ errors });
  }
  const ids = req.body.ids.map((id) => mongoose.Types.ObjectId(id));
  await updater.update(
    "todo",
    { user_id: mongoose.Types.ObjectId(req.user.data._id), _id: { $in: ids } },
    { priority: req.body.number }
  );

  return res.json({ message: "Priority set to: ".concat(req.body.number) });
};

export const remove = async ({ req, res }) => {
  const errors = await Validator(req.body, {
    ids: "required|arrayUnique",
  });
  if (errors) {
    return res.validationError({ errors });
  }
  const ids = req.body.ids.map((id) => mongoose.Types.ObjectId(id));
  await Todo.deleteMany({
    user_id: mongoose.Types.ObjectId(req.user.data._id),
    _id: { $in: ids },
  });

  return res.json({ message: "Marked as deleted" });
};
