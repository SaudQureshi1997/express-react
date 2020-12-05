import {
  storeTasks,
  addTask as insertTask,
  archiveTask as _archiveTask,
  completeTask as _completeTask,
  removeTask as _removeTask,
  prioritizeTask as _prioritizeTask,
  addMessage,
  addErrors,
} from "../redux/reducers/tasks/actions";

const handleError = (dispatch, error) => {
  let message = "Whoops something went wrong";
  if (error.hasOwnProperty("response")) {
    message = error.response.data.message;
    console.log(error.response);
    if (error.response.status === 422) {
      dispatch(addErrors(error.response.data.errors));
    }
  }
  dispatch(addMessage(message));
};

export const fetchTasks = async (dispatch, params = {}) => {
  try {
    const response = await window.axios.get("todos", { params });
    const todos = response.data.todos.map((task) => ({
      ...task,
      id: task._id,
    }));
    dispatch(storeTasks(todos));
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const addTask = async (dispatch, name) => {
  try {
    const response = await window.axios.post("todos", { name });
    dispatch(insertTask(response.data.todo));
    dispatch(addMessage("Task added"));
  } catch (error) {
    handleError(dispatch, error)
  }
};

export const archiveTask = async (dispatch, ids) => {
  try {
    await window.axios.post("todos/archive", { ids });
    dispatch(_archiveTask(ids));
    dispatch(addMessage(`${ids.length} Tasks Archived`));
  } catch (error) {
    handleError(dispatch, error)
  }
};

export const completeTask = async (dispatch, ids) => {
  try {
    console.log(ids);
    await window.axios.post("todos/complete", { ids });
    dispatch(_completeTask(ids));
    dispatch(addMessage(`${ids.length} Tasks Completed`));
  } catch (error) {
    handleError(dispatch, error)
  }
};

export const removeTask = async (dispatch, ids) => {
  try {
    await window.axios.delete("todos", { data: { ids } });
    dispatch(_removeTask(ids));
    dispatch(addMessage(`${ids.length} Tasks Removed`));
  } catch (error) {
    handleError(dispatch, error)
  }
};

export const prioritizeTask = async (dispatch, ids, number) => {
  try {
    await window.axios.post("todos/priority", { ids, number });
    dispatch(_prioritizeTask(ids, number));
    dispatch(addMessage(`${ids.length} Tasks prioritized`));
  } catch (error) {
    handleError(dispatch, error)
  }
};
