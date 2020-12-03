import mongoose from "mongoose";
import moment from "moment";

const TodoSchema = mongoose.Schema({
  priority: { type: Number, index: "priority_index", default: -1 },
  name: { type: String, index: "name_index", max: 100 },
  completed: { type: Boolean, index: "completed_idx", default: false },
  archived: { type: Boolean, index: "completed_idx", default: false },
  user_id: { type: mongoose.Types.ObjectId, index: "user_idx", required: true },
  created_at: {
    type: Date,
    index: "created_at_idx",
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  updated_at: {
    type: Date,
    index: "updated_at_idx",
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

TodoSchema.static("findByUserId", function (user_id) {
  return this.find({ user_id });
});

TodoSchema.methods.archive = function () {
  this.archived = true;
  return this.save();
};

TodoSchema.methods.complete = function () {
  this.completed = true;
  return this.save();
};

TodoSchema.methods.setPriorityTo = function (priority) {
  this.priority = priority;
  return this.save();
};

TodoSchema.methods.ownedBy = function (user_id) {
  return this.user_id == user_id;
};

TodoSchema.pre(["updateOne", "findOneAndUpdate", "save"], function (next) {
  this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  next();
});

const Todo = mongoose.model("todo", TodoSchema);

export default Todo;
