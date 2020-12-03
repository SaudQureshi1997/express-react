import Todo from "@models/todo.js";
import Validator from "@utils/validator.js";

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
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.notfound();
  }
  if (!todo.ownedBy(req.user.data._id)) {
    return res.unauthorized();
  }
  await todo.complete();
  return res.json({ todo });
};

export const archive = async ({ req, res }) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.notfound();
  }
  if (!todo.ownedBy(req.user.data._id)) {
    return res.unauthorized();
  }
  await todo.archive();
  return res.json({ todo });
};

export const setPriority = async ({ req, res }) => {
  const errors = await Validator(req.body, {
    priority: "required|integer|min:1,max:5",
  });

  if (errors) {
    return res.validationError({ errors });
  }

  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.notfound();
  }
  if (!todo.ownedBy(req.user.data._id)) {
    return res.unauthorized();
  }

  await todo.setPriorityTo(req.body.priority);

  return res.json({ todo });
};

export const remove = async ({req, res}) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.notfound();
  }
  if (!todo.ownedBy(req.user.data._id)) {
    return res.unauthorized();
  }
  await todo.remove();

  return res.json({message: 'removed'});
}